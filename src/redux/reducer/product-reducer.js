import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   list_product: [],
   product_detail: {},
   list_product_by_purchase: [],
};

const productReducer = createSlice({
   name: 'productReducer',
   initialState,
   reducers: {
      getListProductReducer: (state, action) => {
         state.list_product = action.payload;
      },
      getProductDetailReducer: (state, action) => {
         state.product_detail = action.payload;
      },
      getListProductByPurchaseReducer: (state, action) => {
         state.list_product_by_purchase = action.payload;
      },
   },
});

export const {
   getListProductReducer,
   getProductDetailReducer,
   getListProductByPurchaseReducer,
} = productReducer.actions;

export default productReducer.reducer;
