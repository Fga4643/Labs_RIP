import {useDispatch, useSelector} from 'react-redux';
import {updateSpare} from "../store/selectedSpareSlice";

export function useSpare() {
	const spare = useSelector(state => state.selectedSpare.spare);

	const dispatch = useDispatch()

	const setSpare= (value) => {
		dispatch(updateSpare(value))
	}

	return {
		spare,
		setSpare
	};
}