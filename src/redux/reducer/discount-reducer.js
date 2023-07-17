import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   list_discount: [],
};

const discountReducer = createSlice({
   name: 'discountReducer',
   initialState,
   reducers: {
      getListDiscountReducer: (state, action) => {
         state.list_discount = action.payload;
      },
   },
});

export const { getListDiscountReducer } = discountReducer.actions;

export default discountReducer.reducer;
