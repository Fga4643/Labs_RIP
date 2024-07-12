import {configureStore} from "@reduxjs/toolkit";

import spareReducer from "./spares/selectedSpareSlice"
import draftOrderReducer from "./orders/orderSlice"
import authReducer from "./users/authSlice"
import ordersReducer from "./orders/ordersSlice"
import sparesReducer  from "./spares/sparesSlice"

export default configureStore({
	reducer: {
		selectedSpare: spareReducer,
		spares: sparesReducer,
		draftOrder: draftOrderReducer,
		orders: ordersReducer,
		user: authReducer
	}
});