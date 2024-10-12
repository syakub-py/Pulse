import axios, { AxiosInstance } from "axios";
import config from "../../env";
export default class PulseHttpClient {
	public readonly http: AxiosInstance;

	constructor() {
		this.http = axios.create({
			baseURL: config.BASE_URL,
			// withCredentials: true,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			}
		});

		// , { headers: { "No-Auth-Required": "true" }
		// this.http.interceptors.request.use((config) => {
		// 	if (config.headers["No-Auth-Required"]) {
		// 		delete config.headers["No-Auth-Required"];
		// 		return config;
		// 	}

		// 	if (!_.isNull(this.accessToken)) {
		// 		config.headers["Authorization"] = this.accessToken;
		// 	} else {
		// 		throw new Error("Access token is not set.");
		// 	}
		// 	return config;
		// }, (error) => {
		// 	return Promise.reject(error);
		// });
	}

	// get accessToken(): string | null {
	// 	return this._accessToken;
	// }

	// set accessToken(accessToken: string | null) {
	// 	this._accessToken = accessToken;
	// 	if (!_.isNull(accessToken)) {
	// 		this.http.defaults.headers["authorization"] = accessToken;
	// 	} else {
	// 		delete this.http.defaults.headers["authorization"];
	// 	}
	// }
}
