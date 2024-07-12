import Cookies from "universal-cookie";

export function useToken() {
	const cookies = new Cookies()

	const access_token = cookies.get("access_token");

	const setAccessToken = (value) => {
		cookies.set("access_token", value, {path: '/aviashop', expires: new Date(Date.now()+25920000)})
	}

	const resetAccessToken = () => {
		cookies.set("access_token", undefined, {path: '/aviashop', expires: new Date(Date.now()+25920000)})
	}

	return {
		access_token,
		setAccessToken,
		resetAccessToken
	};
}