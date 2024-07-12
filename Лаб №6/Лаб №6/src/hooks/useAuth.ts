import {useDispatch, useSelector} from 'react-redux';
import {updateUser, cleanUser} from "../store/authSlice";
import {Response} from "../Types";
import axios from "axios";
import {useToken} from "./useToken";

export function useAuth() {
	const {is_authenticated, is_moderator, user_id, user_name, user_email} = useSelector(state => state.user)

	const { access_token, setAccessToken, resetAccessToken } = useToken()

	const dispatch = useDispatch()

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const resetUser = () => {
		dispatch(cleanUser())
	}

	const logOut = async () => {

		try {

			console.log(access_token)

			const response: Response = await axios(`http://localhost:8000/api/logout/`, {
				method: "POST",
				headers: {
					'authorization': access_token
				}
			})

			if (response.status == 200)
			{
				resetAccessToken()
				resetUser()
			}

		} catch (error) {
			console.log("Что-то пошло не так")
		}

	}


	const register = async (formData) => {

		try {

			const response: Response = await axios(`http://127.0.0.1:8000/api/register/`, {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				},
				data: formData as FormData
			})

			if (response.status == 201) {
				setAccessToken(response.data["access_token"])
				return true
			}

		} catch (error) {

			if (error.response.status == 409) {
				console.log("Пользователь с такой почтой уже существует!")
			} else {
				console.log("Что-то пошло не так")
			}

			return false
		}
	}


	const login = async (formData) => {

		try {
			const response:Response = await axios(`http://127.0.0.1:8000/api/login/`, {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				},
				data: formData as FormData
			})

			setAccessToken(response.data['access_token'])

			const permissions = {
				is_authenticated: true,
				is_moderator: response.data["is_moderator"],
				user_id: response.data["user_id"],
				user_name: response.data["name"],
				user_email: response.data["email"]
			}

			setUser(permissions)

			console.log(`Добро пожаловать, ${response.data["name"]}!`)

			return true

		} catch (error){

			if (error.response.status == 401) {
				console.log("Неправильный логин или пароль")
			} else {
				console.log("Что-то пошло не так")
			}

		}
	}


	const auth = async () => {

		if (is_authenticated)
		{
			return true
		}

		if (!access_token) {
			return false
		}

		try {

			const response: Response = await axios(`http://localhost:8000/api/check/`, {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					'authorization': access_token
				},
			})

			if (response.status == 200)
			{
				const permissions = {
					is_authenticated: true,
					is_moderator: response.data["is_moderator"],
					user_id: response.data["user_id"],
					user_name: response.data["name"],
					user_email: response.data["email"]
				}

				setUser(permissions)

				return true
			}

		} catch (error) {

			return false

		}

	}

	return {
		is_authenticated,
		is_moderator,
		user_id,
		user_name,
		user_email,
		setUser,
		logOut,
		login,
		auth,
		register
	};
}