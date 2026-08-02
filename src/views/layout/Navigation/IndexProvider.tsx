import React, { useState, createContext, useContext, ReactNode } from 'react';
const IndexContext = createContext<number | null>(null);
const IndexUpdateContext = createContext<((currentIndex: number) => void) | null>(null);

export const useIndex = () => useContext(IndexContext);
export const useUpdateIndex = () => {
	const updateIndex = useContext(IndexUpdateContext);

	if (!updateIndex) {
		throw new Error('useUpdateIndex must be used within an IndexProvider');
	}

	return updateIndex;
};

const defaultIndex: number | null = null;

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
