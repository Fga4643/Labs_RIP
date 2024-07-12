import {createSlice} from "@reduxjs/toolkit"

const initialState= {
	queryPageIndex: 0,
	queryPageSize: 5	,
	totalCount: 0,
	status: -1,
};

const ordersSlice = createSlice({
	name: 'orders',
	initialState: initialState,
	reducers: {
		pageChanged(state, action) {
			state.queryPageIndex = action.payload
		},
		pageSizeChanged(state, action) {
			state.queryPageSize = action.payload
		},
		totalCountChanged(state, action) {
			state.totalCount = action.payload
		},
		updateStatus(state, action) {
			state.status = action.payload
		}
	}
})

export const {pageChanged, pageSizeChanged, totalCountChanged, updateStatus} = ordersSlice.actions;

export default ordersSlice.reducer;