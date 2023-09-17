import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   list_category: [],
   product_type: { types_list: [] },
};

const categoryReducer = createSlice({
   name: 'categoryReducer',
   initialState,
   reducers: {
      getListCategoryReducer: (state, action) => {
         state.list_category = action.payload;
      },
      getListProductTypeReducer: (state, action) => {
         state.product_type = action.payload;
      },
      clearProductTypeReducer: (state, action) => {
         state.product_type = { types_list: [] };
      },
   },
});

export const {
   getListCategoryReducer,
   getListProductTypeReducer,
   clearProductTypeReducer,
} = categoryReducer.actions;

export default categoryReducer.reducer;
