import {useDispatch, useSelector} from 'react-redux';
import {updateLesson} from "../store/selectedOrderSlice";

export function useSelectedLesson() {
	const lesson = useSelector(state => state.selectedLesson.lesson);

	const dispatch = useDispatch()

	const setLesson = (value) => {
		dispatch(updateLesson(value))
	}

	return {
		lesson,
		setLesson
	};
}