import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	spares: [],
	query: ""
};

const modalSlice = createSlice({
	name: 'spares',
	initialState: initialState,
	reducers: {
		updateSpares(state, action) {
			state.spares = action.payload
		},
		updateQuery(state, action) {
			state.query = action.payload
		}
	}
})

export const {updateSpares, updateQuery} = modalSlice.actions;

export default modalSlice.reducer;