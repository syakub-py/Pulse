

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function isHTTPError(data: any): data is HTTPError {
	return data && (data.status_code === 500 || data.status_code === 400 || data.status_code === 409);
}