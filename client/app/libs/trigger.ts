export const triggerClient = async (id: string, pathname: string, data: any) => {
	try {
		const host = process.env.NEXT_PUBLIC_BASE_URL_API as string;

		const rawResponse = await fetch(`${host}/trigger/${pathname}?id=${id}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const content = await rawResponse.json();
		return content;
	} catch (error) {
		console.log(error);

		return undefined;
	}
};
