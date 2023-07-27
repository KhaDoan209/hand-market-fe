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
   },
});

export const { getListSavedCardReducer } = cardReducer.actions;

export default cardReducer.reducer;
