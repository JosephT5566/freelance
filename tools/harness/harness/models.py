from typing import Literal
from pydantic import BaseModel, ConfigDict, Field, model_validator


class Strict(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)


class Check(Strict):
    name: str = Field(pattern=r"^[a-z][a-z0-9-]*$")
    argv: list[str] = Field(min_length=1)


class Policy(Strict):
    schema_version: Literal[1]
    base: str = Field(pattern=r"^[A-Za-z0-9][A-Za-z0-9_./-]*$")
    max_fix_rounds: Literal[2]
    command_timeout: int = Field(ge=1, le=3600)
    review_timeout: int = Field(ge=1, le=3600)
    checks: list[Check] = Field(min_length=1)
    sensitive_paths: list[str]
    visual_paths: list[str]
    context: list[str]

    @model_validator(mode="after")
    def unique_checks(self):
        if len({c.name for c in self.checks}) != len(self.checks):
            raise ValueError("Check names must be unique")
        return self


class Finding(Strict):
    id: str = Field(pattern=r"^[a-zA-Z0-9_-]+$")
    path: str = Field(min_length=1)
    source_side: Literal["head", "base"]
    start_line: int = Field(ge=1)
    end_line: int = Field(ge=1)
    excerpt: str = Field(min_length=1)
    scenario: str = Field(min_length=1)
    impact: str = Field(min_length=1)
    severity: Literal["low", "medium", "high", "critical"]


class Review(Strict):
    findings: list[Finding]


class Decision(Strict):
    finding_id: str
    verdict: Literal["must-fix", "dismissed", "needs-human"]
    rationale: str = Field(min_length=1)


class Judgment(Strict):
    decisions: list[Decision]
