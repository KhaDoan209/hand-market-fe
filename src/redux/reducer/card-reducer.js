import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   list_card: [],
};

const cardReducer = createSlice({
   name: 'cardReducer',
   initialState,
   reducers: {
      getListSavedCardReducer: (state, action) => {
         state.list_card = action.payload;
      },
      clearCardReducer: (state, action) => {
         state.list_card = [];
      },
   },
});

export const { getListSavedCardReducer, clearCardReducer } =
   cardReducer.actions;

export default cardReducer.reducer;
