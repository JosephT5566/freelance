import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { debounce } from '../../utils/helpers';

export default function PupupAnimate(props: { children: ReactNode }) {
	const { children } = props;
	const [display, setDisplay] = useState(false);
	const animateRef = useRef(null);

	const springProps = useSpring({ opacity: display ? 1 : 0, y: display ? 0 : 30 });

	const handleScroll = debounce(() => {
		const { bottom, height } = animateRef.current
			? animateRef.current.getBoundingClientRect()
			: { bottom: 0, height: 0 };
		setDisplay(bottom - height / 3 <= window.innerHeight);
	});

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	return (
		<animated.div ref={animateRef} style={{ ...springProps }}>
			{children}
		</animated.div>
	);
}
