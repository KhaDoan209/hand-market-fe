import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
   list_notification: [],
};

const notiReducer = createSlice({
   name: 'notiReducer',
   initialState,
   reducers: {
      getListNotificationReducer: (state, action) => {
         state.list_notification = action.payload;
      },
   },
});

export const { getListNotificationReducer, clearNotificationReducer } =
   notiReducer.actions;

export default notiReducer.reducer;
