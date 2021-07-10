import React, { useState, createContext, useContext, ReactNode } from 'react';
const IndexContext = createContext(null);
const IndexUpdateContext = createContext(null);

export const useIndex = () => useContext(IndexContext);
export const useUpdateIndex = () => useContext(IndexUpdateContext);

const defaultIndex: number = null;

export function IndexProvider(props: { children: ReactNode }) {
	const { children } = props;
	const [index, setIndex] = useState(defaultIndex);

	const handleIndexChange = (currentIndex: number) => setIndex(currentIndex);

	return (
		<IndexContext.Provider value={index}>
			<IndexUpdateContext.Provider value={handleIndexChange}>{children}</IndexUpdateContext.Provider>
		</IndexContext.Provider>
	);
}
