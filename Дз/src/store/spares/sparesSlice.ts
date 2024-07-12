import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	spares: [],
	query: "",
	queryPageIndex: 0,
	queryPageSize: 5,
	totalCount: 0
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
		},
		pageChanged(state, action) {
			state.queryPageIndex = action.payload
		},
		pageSizeChanged(state, action) {
			state.queryPageSize = action.payload
		},
		totalCountChanged(state, action) {
			state.totalCount = action.payload
		}
	}
})

export const {
	updateSpares,
	updateQuery,
	pageChanged,
	pageSizeChanged,
	totalCountChanged
} = modalSlice.actions;

export default modalSlice.reducer;