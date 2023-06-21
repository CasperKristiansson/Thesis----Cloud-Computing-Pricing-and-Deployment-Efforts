//const apiUrl = process.env.REACT_APP_API_URL;
const apiUrl = window.location.hostname === "localhost" ? "http://localhost:7071/api" : "https://amaceit-ticket-system-api.azurewebsites.net/api";

export const requestApi = async (path = "", method = "GET", token = "", data = {}, headers = {}) => {
	if (!apiUrl) {
		throw new Error(
			`Error: Missing API Domain - Please add the API domain from your serverless Express.js back-end to this front-end application.  You can do this in the "site" folder, in the "./config.js" file.  Instructions are listed there and in the documentation.`
		);
	}

	let url = ''

	if (!path.startsWith("/")) url = `${apiUrl}/${path}`;
	else url = `${apiUrl}${path}`;
	
	let headerObj: { "Content-Type": string; Authorization?: string } = {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${token}`
	};

	headers = Object.assign(headerObj, headers);

	const response = await fetch(url, {
		method: method.toUpperCase(),
		mode: "cors",
		cache: "no-cache",
		headers: headers,
		body: data && method.toUpperCase() !== "GET" ? JSON.stringify(data) : null,
	});

	try {
		if (response.status < 200 || response.status >= 300) {
			throw new Error(await response.text());
		} else {
			return await response.json();
		}
	} catch (error) {
		console.error(error);
	}

	//return await response.json();
};