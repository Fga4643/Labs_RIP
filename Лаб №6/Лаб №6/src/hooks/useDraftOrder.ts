import {useDispatch, useSelector} from 'react-redux';
import {
	updateOrder,
	updateSpares
} from "../store/draftOrderSlice";
import axios from "axios";
import {useToken} from "./useToken";

export function useDraftOrder() {

	const {access_token} = useToken()

	const order = useSelector(state => state.draftOrder.order);

	const dispatch = useDispatch()

	const setOrder = (value) => {
		dispatch(updateOrder(value))
	}

	const setSpares = (value) => {
		dispatch(updateSpares(value))
	}

	const saveOrder = async () => {
		try {

			await axios(`http://localhost:8000/api/lessons/${lesson.id}/update/`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					'authorization': access_token
				},
				data: lesson
			})

		} catch (e) {
			console.log(e)
		}
	}

	return {
		order,
		setOrder,
		setSpares,
		saveOrder
	};
}