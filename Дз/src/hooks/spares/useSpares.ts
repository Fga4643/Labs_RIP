import {useDispatch, useSelector} from 'react-redux';
import {
	updateSpares,
	updateQuery,
	pageChanged,
	pageSizeChanged,
	totalCountChanged
} from "../../store/spares/sparesSlice";
import {api} from "../../utils/api";

export function useSpares() {
	const spares = useSelector(state => state.spares.spares);
	const query = useSelector(state => state.spares.query);
	const queryPageIndex = useSelector(state => state.spares.queryPageIndex);
	const queryPageSize = useSelector(state => state.spares.queryPageSize);
	const totalCount = useSelector(state => state.spares.totalCount);

	const dispatch = useDispatch()

	const setSpares = (value) => {
		dispatch(updateSpares(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}
	
	const setSparesPage = (value) => {
		dispatch(pageChanged(value))
	}

	const setSparesPageSize = (value) => {
		dispatch(pageSizeChanged(value))
	}

	const setSparesPageTotalCount = (value) => {
		dispatch(totalCountChanged(value))
	}
	
	const searchSpares = async (pageNumber = queryPageIndex, pageSize = queryPageSize) => {

		const offset = pageNumber * pageSize

		const {data} = await api.get(`spares/search`, {
			params: {
				query: query,
				offset: offset,
				limit: pageSize
			}
		})

		return data

	}

	return {
		spares,
		setSpares,
		query,
		setQuery,
		searchSpares,
		queryPageIndex,
		setSparesPage,
		queryPageSize,
		setSparesPageSize,
		totalCount,
		setSparesPageTotalCount
	};
}