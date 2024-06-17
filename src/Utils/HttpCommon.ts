import axios from "axios";

const http = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	headers: {
		"Content-type": "application/json",
		"Access-Control-Allow-Origin": "*",
	}
});

export default http;
