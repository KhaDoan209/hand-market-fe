import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   list_product: [],
};

const productReducer = createSlice({
   name: 'productReducer',
   initialState,
   reducers: {
      getListProductReducer: (state, action) => {
         state.list_product = action.payload;
      },
   },
});

export const { getListProductReducer } = productReducer.actions;

export default productReducer.reducer;
