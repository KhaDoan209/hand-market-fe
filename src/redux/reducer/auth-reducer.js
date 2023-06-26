import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   emailValid: {},
};

const authReducer = createSlice({
   name: 'authReducer',
   initialState,
   reducers: {
      checkExistedEmailReducer: (state, action) => {
         state.emailValid = action.payload;
      },
   },
});

export const { checkExistedEmailReducer } = authReducer.actions;

export default authReducer.reducer;
