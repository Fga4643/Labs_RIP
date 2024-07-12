import {useDispatch, useSelector} from 'react-redux';
import {
	updateSpare,
	updateSpareName,
	updateSpareDescription,
	updateSpareWeight,
	updateSpareRating,
	updateSpareImage,
	updateSparePrice
} from "../../store/spares/selectedSpareSlice";
import {api} from "../../utils/api";

export function useSpare() {
	const spare = useSelector(state => state.selectedSpare.spare);

	const dispatch = useDispatch()

	const setSpare= (value) => {
		dispatch(updateSpare(value))
	}

	const setSpareName = (value) => {
		dispatch(updateSpareName(value))
	}

	const setSpareDescription = (value) => {
		dispatch(updateSpareDescription(value))
	}

	const setSparePrice = (value) => {
		dispatch(updateSparePrice(value))
	}

	const setSpareWeight = (value) => {
		dispatch(updateSpareWeight(value))
	}

	const setSpareRating = (value) => {
		dispatch(updateSpareRating(value))
	}

	const setSpareImage = (value) => {
		dispatch(updateSpareImage(value))
	}

	const fetchSpareData = async (id) => {

		const {data} = await api.get(`spares/${id}`);

		setSpare(data)

	};

	return {
		spare,
		setSpare,
		setSpareImage,
		setSpareName,
		setSpareDescription,
		setSpareWeight,
		setSparePrice,
		setSpareRating,
		fetchSpareData
	};
}