import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   list_order_by_user: [],
   list_pending_delivery_order: {},
   order_in_progress: {},
   order_detail: {},
   list_waiting_done: [],
};

const orderReducer = createSlice({
   name: 'orderReducer',
   initialState,
   reducers: {
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
   },
});

export const {
   getListOrderByUserReducer,
   getListPendingDeliveryOrderReducer,
   getOrderInProgressReducer,
   getOrderDetailReducer,
   getListWatingDoneOrderReducer,
} = orderReducer.actions;

export default orderReducer.reducer;
