import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	spare: undefined,
};

const selectedSpareSlice = createSlice({
	name: 'selectedSpare',
	initialState: initialState,
	reducers: {
		updateSpare(state, action) {
			state.spare = action.payload
		}
	}
})

export const {updateSpare} = selectedSpareSlice.actions;

export default selectedSpareSlice.reducer;