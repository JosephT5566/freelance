export const fetcher = async (url: string) => {
	try {
		const response = await fetch(url, {
			method: 'GET',
		});
		if (!response.ok) {
			const errResp = await response.json();
			console.log(errResp);
			throw response.status;
		}
		return await response.json();
	} catch (error) {
		throw error;
	}
};
