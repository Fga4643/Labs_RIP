import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	order: undefined
};

const orderSlice = createSlice({
	name: 'draftOrder',
	initialState: initialState,
	reducers: {
		updateOrder(state, action) {
			state.order = action.payload
		},
		updateSpares(state, action){
			state.order.spares = action.payload
		}
	}
})

export const {updateOrder, updateSpares} = orderSlice.actions;

export default orderSlice.reducer;