import {useDispatch, useSelector} from 'react-redux';
import {
	updateOrder,
	updateSpares
} from "../../store/orders/orderSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";

export function useOrder() {

	const {access_token} = useToken()

	const order = useSelector(state => state.draftOrder.order)

	const is_draft = order?.status == 1

	const dispatch = useDispatch()

	const setOrder = (value) => {
		dispatch(updateOrder(value))
	}

	const setSpares = (value) => {
		dispatch(updateSpares(value))
	}

	const sendOrder = async () => {

		const response = await api.put(`orders/${order.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setOrder(undefined)
		}
	}

	const deleteOrder = async () => {

		const response: Response = await api.delete(`orders/${order.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setOrder(undefined)
		}

	}

	const saveOrder = async () => {
		try {

			await api.put(`http://localhost:8000/api/orders/${order.id}/update/`, order, {
				headers: {
					'authorization': access_token
				}
			})

		} catch (e) {
			console.log(e)
		}
	}

	const fetchDraftOrder = async () => {

		const {data} = await api.get(`orders/draft/`, {
			headers: {
				'authorization': access_token
			},
		})

		setOrder(data)

	}

	const fetchOrder = async (order_id) => {

		const {data} = await api.get(`orders/${order_id}/`, {
			headers: {
				'authorization': access_token
			},
		})

		setOrder(data)

	}

	const addSpareToOrder = async (spare) => {

		const response = await api.post(`spares/${spare.id}/add_to_order/`, {}, {
			headers: {
				'authorization': access_token
			},
		});

		if (response.status == 200) {
			setOrder(response.data)
		}
	}

	const deleteSpareFromOrder = async (spare) => {
		const response = await api.delete(`orders/${order.id}/delete_spare/${spare.id}/`, {
			headers: {
				'authorization': access_token
			},
		});

		if (response.status == 200) {
			console.log(response.data)
			setOrder(response.data)
		}
	}

	return {
		order,
		is_draft,
		setOrder,
		setSpares,
		saveOrder,
		sendOrder,
		deleteOrder,
		fetchDraftOrder,
		fetchOrder,
		addSpareToOrder,
		deleteSpareFromOrder
	};
}