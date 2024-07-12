import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	lesson: undefined
};

const selectedOrderSlice = createSlice({
	name: 'selectedLesson',
	initialState: initialState,
	reducers: {
		updateLesson(state, action) {
			state.lesson = action.payload
		}
	}
})

export const {updateLesson} = selectedOrderSlice.actions;

export default selectedOrderSlice.reducer;