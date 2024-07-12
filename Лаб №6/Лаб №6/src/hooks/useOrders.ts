import {useDispatch, useSelector} from 'react-redux';
import {pageChanged, pageSizeChanged, totalCountChanged} from "../store/ordersSlice";

export function useOrders() {
	const queryPageIndex = useSelector(state => state.orders.queryPageIndex);
	const queryPageSize = useSelector(state => state.orders.queryPageSize);
	const totalCount = useSelector(state => state.orders.totalCount);

	const dispatch = useDispatch()

	const setOrdersPage = (value) => {
		dispatch(pageChanged(value))
	}

	const setOrdersPageSize = (value) => {
		dispatch(pageSizeChanged(value))
	}

	const setOrdersPageTotalCount = (value) => {
		dispatch(totalCountChanged(value))
	}

	return {
		queryPageIndex,
		queryPageSize,
		totalCount,
		setOrdersPage,
		setOrdersPageSize,
		setOrdersPageTotalCount
	};
}