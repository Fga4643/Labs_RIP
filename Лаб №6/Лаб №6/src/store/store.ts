import {configureStore} from "@reduxjs/toolkit";

import spareReducer from "./selectedSpareSlice"
import draftOrderReducer from "./draftOrderSlice"
import authReducer from "./authSlice"
import ordersReducer from "./ordersSlice"
import sparesReducer  from "./sparesSlice"

export default configureStore({
	reducer: {
		selectedSpare: spareReducer,
		spares: sparesReducer,
		draftOrder: draftOrderReducer,
		orders: ordersReducer,
		user: authReducer
	}
});