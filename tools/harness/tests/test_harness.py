import json
import os
import subprocess
import sys
import textwrap
import time
import sqlite3
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from langgraph.checkpoint.sqlite import SqliteSaver
from langgraph.types import Command

from harness.cli import run_lock, run_path, verify_report
from harness.engine import build_graph
from harness.models import Judgment, Policy, Review
from harness.runtime import assert_candidate, bindings, candidate, command, git, validate_findings, write_json


class HarnessTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        def run(*args):
            result = command(list(args), self.root)
            self.assertEqual(result['exit_code'], 0, result)
        self.run_command = run
        run('git', 'init', '-b', 'main')
        run('git', 'config', 'user.email', 'fixture@example.com')
        run('git', 'config', 'user.name', 'Fixture')
        (self.root / '.gitignore').write_text('.harness/runs/\n')
        (self.root / 'code.txt').write_text('before\n')
        run('git', 'add', '.')
        run('git', 'commit', '-m', 'base')
        run('git', 'checkout', '-b', 'feature')
        (self.root / 'code.txt').write_text('after\n')
        run('git', 'add', '.')
        run('git', 'commit', '-m', 'candidate')
        self.config = Policy(schema_version=1, base='main', max_fix_rounds=2,
                             command_timeout=5, review_timeout=5,
                             checks=[{'name': 'fixture', 'argv': ['git', 'status', '--porcelain']}],
                             sensitive_paths=[], visual_paths=[], context=[])
        self.directory = self.root / '.harness/runs' / ('a' * 32)
        self.directory.mkdir(parents=True)
        self.conn = sqlite3.connect(self.directory / 'checkpoint.sqlite', check_same_thread=False)
        self.addCleanup(self.conn.close)
        self.binding_patch = patch('harness.runtime.pstack_material', return_value='fixture principles')
        self.binding_patch.start()
        self.addCleanup(self.binding_patch.stop)
        self.prompt_patch = patch('harness.engine.pstack_material', return_value='fixture principles')
        self.prompt_patch.start()
        self.addCleanup(self.prompt_patch.stop)

    def initial(self):
        value = {'purpose': 'fixture purpose', 'snapshot': candidate(self.root, 'main'),
                 'binding': bindings(self.root, self.config), 'round': 0, 'reviews': [], 'attestation': None}
        write_json(self.directory / 'metadata.json', {'purpose': value['purpose'], 'binding': value['binding']})
        return value

    def graph(self, backend):
        return build_graph(self.root, self.directory, self.config, backend, SqliteSaver(self.conn))

    def backend(self, root, directory, role, prompt, schema, timeout):
        return schema.model_validate({'decisions': []} if role == 'adjudicator' else {'findings': []})

    def test_fan_in_and_report_tampering(self):
        seen = []
        def backend(*args):
            seen.append(args[2])
            return self.backend(*args)
        graph = self.graph(backend)
        output = graph.invoke(self.initial(), {'configurable': {'thread_id': 'test'}})
        self.assertEqual(output['report']['status'], 'local-ready')
        self.assertEqual(sorted(seen), ['adjudicator', 'architecture', 'risk', 'test-gaps'])
        verify_report(self.root, self.directory, self.config)
        path = self.directory / '0/report.json'
        report = json.loads(path.read_text())
        report['status'] = 'tampered'
        path.write_text(json.dumps(report))
        with self.assertRaisesRegex(ValueError, 'digest'):
            verify_report(self.root, self.directory, self.config)

    def test_empty_and_stale_candidates(self):
        with self.assertRaisesRegex(ValueError, 'No changes'):
            candidate(self.root, 'HEAD')
        snap = candidate(self.root, 'main')
        (self.root / 'code.txt').write_text('dirty\n')
        with self.assertRaisesRegex(ValueError, 'clean'):
            assert_candidate(self.root, snap)
        self.run_command('git', 'add', '.')
        self.run_command('git', 'commit', '-m', 'new')
        with self.assertRaisesRegex(ValueError, 'stale'):
            assert_candidate(self.root, snap)

    def test_findings_validate_source_and_path(self):
        data = {'id': 'one', 'path': 'code.txt', 'source_side': 'head', 'start_line': 1, 'end_line': 1,
                'excerpt': 'after', 'scenario': 'input', 'impact': 'failure', 'severity': 'high'}
        snap = candidate(self.root, 'main')
        validate_findings(self.root, snap, Review(findings=[data]))
        for key, value in [('path', '../outside'), ('excerpt', 'invented'), ('end_line', 10)]:
            with self.subTest(key=key), self.assertRaises(ValueError):
                validate_findings(self.root, snap, Review(findings=[{**data, key: value}]))

    def test_deleted_file_evidence_uses_pinned_base(self):
        self.run_command('git', 'rm', 'code.txt')
        self.run_command('git', 'commit', '-m', 'remove candidate file')
        snap = candidate(self.root, 'main')
        data = {'id': 'removed', 'path': 'code.txt', 'source_side': 'base',
                'start_line': 1, 'end_line': 1, 'excerpt': 'before',
                'scenario': 'caller uses removed functionality', 'impact': 'failure', 'severity': 'high'}
        validate_findings(self.root, snap, Review(findings=[data]))
        with self.assertRaisesRegex(ValueError, 'unavailable'):
            validate_findings(self.root, snap, Review(findings=[{**data, 'source_side': 'head'}]))

    def test_unavailable_reviewer_blocks(self):
        def unavailable(*args):
            if args[2] == 'risk':
                raise ValueError('offline')
            return self.backend(*args)
        output = self.graph(unavailable).invoke(self.initial(), {'configurable': {'thread_id': 'test'}})
        self.assertEqual(output['report']['status'], 'needs-human')
        self.assertTrue(output['__interrupt__'])

    def test_invalid_judge_and_durable_two_round_limit(self):
        def invalid(*args):
            if args[2] == 'adjudicator':
                return Judgment(decisions=[{'finding_id': 'invented', 'verdict': 'dismissed', 'rationale': 'wrong'}])
            return self.backend(*args)
        thread = {'configurable': {'thread_id': 'test'}}
        output = self.graph(invalid).invoke(self.initial(), thread)
        self.assertIn('every finding', output['report']['reasons'][0])
        for index in range(1, 3):
            (self.root / 'code.txt').write_text(f'repair {index}\n')
            self.run_command('git', 'add', '.')
            self.run_command('git', 'commit', '-m', f'repair {index}')
            # Rebuild graph and connection to exercise durable checkpoint restore.
            self.conn.close()
            self.conn = sqlite3.connect(self.directory / 'checkpoint.sqlite', check_same_thread=False)
            output = self.graph(invalid).invoke(Command(resume={'attestation': None}), thread)
            self.assertEqual(output['round'], index)
            self.assertTrue(output['__interrupt__'])
        (self.root / 'code.txt').write_text('third repair\n')
        self.run_command('git', 'add', '.')
        self.run_command('git', 'commit', '-m', 'third repair')
        with self.assertRaisesRegex(ValueError, 'exhausted'):
            self.graph(invalid).invoke(Command(resume={'attestation': None}), thread)

    def test_failed_check_never_sends_code_to_reviewers(self):
        self.config.checks[0].argv = ['not-a-real-installed-check-7825']
        def forbidden(*args):
            self.fail('Reviewer ran despite failed required scan')
        output = self.graph(forbidden).invoke(self.initial(), {'configurable': {'thread_id': 'test'}})
        self.assertEqual(output['report']['status'], 'needs-human')
        self.assertEqual(output['report']['checks'][0]['exit_code'], -1)

    def test_same_head_attestation_reruns_without_duplicate_reviews(self):
        self.config.visual_paths = ['code.txt']
        thread = {'configurable': {'thread_id': 'test'}}
        first = self.graph(self.backend).invoke(self.initial(), thread)
        self.assertEqual(first['report']['visual_validation'], 'unverified')
        attestation = {'head': first['snapshot']['head'], 'operator_statement': 'Fixture operator inspected UI'}
        second = self.graph(self.backend).invoke(Command(resume={'attestation': attestation}), thread)
        self.assertEqual(second['report']['status'], 'local-ready')
        self.assertEqual(second['round'], 0)
        self.assertEqual(second['attempt'], 1)
        self.assertTrue((self.directory / '0/report.json').is_file())
        self.assertTrue((self.directory / '1/report.json').is_file())
        verify_report(self.root, self.directory, self.config)

    def test_merge_base_excludes_unrelated_target_branch_changes(self):
        self.run_command('git', 'checkout', 'main')
        (self.root / 'unrelated.txt').write_text('target only\n')
        self.run_command('git', 'add', '.')
        self.run_command('git', 'commit', '-m', 'advance target')
        self.run_command('git', 'checkout', 'feature')
        snap = candidate(self.root, 'main')
        self.assertEqual(snap['paths'], ['code.txt'])
        self.assertNotEqual(snap['base'], snap['merge_base'])

    def test_lock_and_invalid_model_output_fail_closed(self):
        with run_lock(self.directory), self.assertRaisesRegex(ValueError, 'active'):
            with run_lock(self.directory):
                pass
        def malformed(*args):
            return Review.model_validate_json('{"findings": [{"id": "missing-fields"}]}')
        output = self.graph(malformed).invoke(self.initial(), {'configurable': {'thread_id': 'test'}})
        self.assertEqual(output['report']['status'], 'needs-human')
        self.assertTrue(output['report']['reasons'])

    def test_checkpoint_resume_in_new_process(self):
        thread = {'configurable': {'thread_id': 'test'}}
        def offline(*args):
            raise ValueError('offline fixture')
        self.graph(offline).invoke(self.initial(), thread)
        self.conn.close()
        script = textwrap.dedent("""
            import json, sqlite3, sys
            from pathlib import Path
            from unittest.mock import patch
            from langgraph.checkpoint.sqlite import SqliteSaver
            from langgraph.types import Command
            from harness.engine import build_graph
            from harness.models import Policy
            root, directory = map(Path, sys.argv[1:3])
            config = Policy.model_validate_json(sys.argv[3])
            def backend(root, directory, role, prompt, schema, timeout):
                return schema.model_validate({'decisions': []} if role == 'adjudicator' else {'findings': []})
            with patch('harness.runtime.pstack_material', return_value='fixture principles'), patch('harness.engine.pstack_material', return_value='fixture principles'):
                with sqlite3.connect(directory / 'checkpoint.sqlite', check_same_thread=False) as connection:
                    graph = build_graph(root, directory, config, backend, SqliteSaver(connection))
                    output = graph.invoke(Command(resume={'attestation': None}), {'configurable': {'thread_id': 'test'}})
                    assert output['report']['status'] == 'local-ready', output
            print('resumed in new process')
        """)
        result = subprocess.run([sys.executable, '-c', script, str(self.root), str(self.directory),
                                 self.config.model_dump_json()], capture_output=True, text=True,
                                env={**os.environ, 'PYTHONPATH': str(Path(__file__).resolve().parents[1])},
                                timeout=60)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn('resumed in new process', result.stdout)

    def test_command_timeout_terminates_descendants(self):
        marker = self.root / 'late-write'
        child = "import time; from pathlib import Path; time.sleep(1); Path(" + repr(str(marker)) + ").write_text('late')"
        parent = "import subprocess,sys,time; subprocess.Popen([sys.executable, '-c', " + repr(child) + "]); print('started', flush=True); time.sleep(10)"
        output = command([sys.executable, '-c', parent], self.root, timeout=0.3)
        self.assertEqual(output['exit_code'], -1)
        self.assertTrue(output['timed_out'])
        self.assertIn('started', output['stdout'])
        time.sleep(1.1)
        self.assertFalse(marker.exists())

    def test_run_id_rejects_traversal(self):
        with self.assertRaises(ValueError):
            run_path(self.root, '../../outside')


if __name__ == '__main__':
    unittest.main()
