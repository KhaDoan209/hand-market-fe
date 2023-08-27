import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   list_order: [],
   list_order_by_user: [],
   list_pending_delivery_order: {},
   list_waiting_done: [],
   list_order_by_user_for_admin: [],
   order_in_progress: {},
   order_detail: {},
};

const orderReducer = createSlice({
   name: 'orderReducer',
   initialState,
   reducers: {
      getListOrderReducer: (state, action) => {
         state.list_order = action.payload;
      },
      getListOrderByUserReducer: (state, action) => {
         state.list_order_by_user = action.payload;
      },
      getListPendingDeliveryOrderReducer: (state, action) => {
         state.list_pending_delivery_order = action.payload;
      },
      getOrderInProgressReducer: (state, action) => {
         state.order_in_progress = action.payload;
      },
      getOrderDetailReducer: (state, action) => {
         state.order_detail = action.payload;
      },
      getListWatingDoneOrderReducer: (state, action) => {
         state.list_waiting_done = action.payload;
      },
      getListOrderByUserForAdminReducer: (state, action) => {
         state.list_order_by_user_for_admin = action.payload;
      },
   },
});

export const {
   getListOrderReducer,
   getListOrderByUserReducer,
   getListPendingDeliveryOrderReducer,
   getOrderInProgressReducer,
   getOrderDetailReducer,
   getListWatingDoneOrderReducer,
   getListOrderByUserForAdminReducer,
} = orderReducer.actions;

export default orderReducer.reducer;
