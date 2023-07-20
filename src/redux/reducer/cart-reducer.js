import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   list_item_in_cart: [],
};

const cartReducer = createSlice({
   name: 'cartReducer',
   initialState,
   reducers: {
      getItemCartByUserReducer: (state, action) => {
         state.list_item_in_cart = action.payload;
      },
   },
});

export const { getItemCartByUserReducer } = cartReducer.actions;

export default cartReducer.reducer;
