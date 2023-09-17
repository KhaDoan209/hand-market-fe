import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
   list_product: [],
   product_detail: {},
   list_product_by_purchase: [],
   list_product_by_discount: [],
   list_product_by_view: [],
   list_product_for_user: {
      data: [],
      pageSize: 0,
      firstPage: 0,
      lastPages: 0,
      totalPages: 0,
      nextPage: 0,
      previousPage: 0,
      totalRecords: 0,
      currentPage: 0,
   },
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
      getListProductByDiscountReducer: (state, action) => {
         state.list_product_by_discount = action.payload;
      },
      getListProductByViewReducer: (state, action) => {
         state.list_product_by_view = action.payload;
      },
      getListProductForUserReducer: (state, action) => {
         const {
            data,
            pageSize,
            firstPage,
            lastPages,
            totalPages,
            nextPage,
            previousPage,
            totalRecords,
            currentPage,
         } = action.payload;
         state.list_product_for_user = {
            ...state.list_product_for_user,
            data: [...state.list_product_for_user.data, ...data],
            pageSize,
            firstPage,
            lastPages,
            totalPages,
            nextPage,
            previousPage,
            totalRecords,
            currentPage,
         };
      },
      clearListProductForUserReducer: (state, action) => {
         state.list_product_for_user = {
            data: [],
            pageSize: 0,
            firstPage: 0,
            lastPages: 0,
            totalPages: 0,
            nextPage: 0,
            previousPage: 0,
            totalRecords: 0,
            currentPage: 0,
         };
      },
   },
});

export const {
   getListProductReducer,
   getProductDetailReducer,
   getListProductByPurchaseReducer,
   getListProductByDiscountReducer,
   getListProductForUserReducer,
   clearListProductForUserReducer,
   getListProductByViewReducer,
} = productReducer.actions;

export default productReducer.reducer;
