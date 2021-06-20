import React, { useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { debounce } from '../../utils/helpers';

export default function PupupAnimate(props: { disabled?: boolean; children: ReactNode }) {
	const { disabled = false, children } = props;
	const [display, setDisplay] = useState(false);
	const animateRef = useRef(null);

	const springProps = useSpring({ opacity: display ? 1 : 0, y: display ? 0 : 30 });

	const handleScroll = useCallback(
		debounce(() => {
			console.log('scroll');
			const { bottom, height } = animateRef.current
				? animateRef.current.getBoundingClientRect()
				: { bottom: 0, height: 0 };

			setDisplay(bottom - height / 3 <= window.innerHeight);
		}),
		[]
	);

	useEffect(() => {
		console.log('register scroll event');
		!disabled && window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll, disabled]);

	return (
		<animated.div ref={animateRef} style={disabled ? { opacity: 1 } : { ...springProps }}>
			{children}
		</animated.div>
	);
}
