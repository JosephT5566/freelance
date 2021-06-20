import { useEffect, useState } from 'react';

const useWidth = (ref: React.MutableRefObject<any>): number => {
	const [width, setWidth] = useState(0);

	useEffect(() => {
		return !!ref.current && setWidth(ref.current.clientWidth);
	}, [ref.current?.clientWidth]);

	return width;
};

export default useWidth;
