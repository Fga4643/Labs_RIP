import {useDispatch, useSelector} from 'react-redux';
import {pageChanged, pageSizeChanged, totalCountChanged, updateStatus} from "../../store/orders/ordersSlice";
import {api} from "../../utils/api";
import {useToken} from "../users/useToken";

export function useOrders() {
	const queryPageIndex = useSelector(state => state.orders.queryPageIndex);
	const queryPageSize = useSelector(state => state.orders.queryPageSize);
	const totalCount = useSelector(state => state.orders.totalCount);
	const status = useSelector(state => state.orders.status)

	const dispatch = useDispatch()

	const {access_token} = useToken()

	const setOrdersPage = (value) => {
		dispatch(pageChanged(value))
	}

	const setOrdersPageSize = (value) => {
		dispatch(pageSizeChanged(value))
	}

	const setStatus = (value) => {
		dispatch(updateStatus(value))
	}

	const setOrdersPageTotalCount = (value) => {
		dispatch(totalCountChanged(value))
	}

	const searchOrders = async (page, pageSize) => {

		const offset = page * pageSize

		const {data} = await api.get(`orders/search/`, {
			params: {
				status: status,
				offset: offset,
				limit: pageSize
			},
			headers: {
				'authorization': access_token
			}
		})

		return data

	}

	return {
		queryPageIndex,
		queryPageSize,
		totalCount,
		status,
		setOrdersPage,
		setOrdersPageSize,
		setOrdersPageTotalCount,
		setStatus,
		searchOrders
	};
}