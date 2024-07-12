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
		},
		updateSpareName(state, action) {
			state.spare.name = action.payload
		},
		updateSpareDescription(state, action) {
			state.spare.description = action.payload
		},
		updateSparePrice(state, action) {
			state.spare.price = action.payload
		},
		updateSpareWeight(state, action) {
			state.spare.weight = action.payload
		},
		updateSpareRating(state, action) {
			state.spare.rating = action.payload
		},
		updateSpareImage(state, action) {
			state.spare.image = action.payload
		}
	}
})

export const {
	updateSpare,
	updateSpareName,
	updateSpareDescription,
	updateSparePrice,
	updateSpareWeight,
	updateSpareRating,
	updateSpareImage
} = selectedSpareSlice.actions;

export default selectedSpareSlice.reducer;