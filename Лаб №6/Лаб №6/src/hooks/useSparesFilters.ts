import {useDispatch, useSelector} from 'react-redux';
import {updateSpares, updateQuery} from "../store/sparesSlice";

export function useSparesFilters() {
	const spares = useSelector(state => state.spares.spares);
	const query = useSelector(state => state.spares.query);

	const dispatch = useDispatch()

	const setSpares = (value) => {
		dispatch(updateSpares(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}

	return {
		spares,
		setSpares,
		query,
		setQuery
	};
}