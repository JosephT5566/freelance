import { useEffect, useState } from 'react';

const useWidth = (ref: React.MutableRefObject<any>, deps?: Array<any>): number => {
	const [width, setWidth] = useState(0);

	const updateWidth = () => {
		ref.current && setWidth(ref.current.clientWidth);
	};

	useEffect(() => {
		updateWidth();
		window.addEventListener('resize', updateWidth);

		return () => window.removeEventListener('resize', updateWidth);
	}, deps);

	return width;
};

export default useWidth;
