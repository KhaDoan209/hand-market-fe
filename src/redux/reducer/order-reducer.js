import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   list_order_by_user: [],
};

const orderReducer = createSlice({
   name: 'orderReducer',
   initialState,
   reducers: {
      getListOrderByUserReducer: (state, action) => {
         state.list_order_by_user = action.payload;
      },
   },
});

export const { getListOrderByUserReducer } = orderReducer.actions;

export default orderReducer.reducer;
