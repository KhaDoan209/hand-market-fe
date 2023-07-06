import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   emailValid: {},
   user_signed_in: {},
};

const authReducer = createSlice({
   name: 'authReducer',
   initialState,
   reducers: {
      checkExistedEmailReducer: (state, action) => {
         state.emailValid = action.payload;
      },
      getSignedInUserReducer: (state, action) => {
         state.user_signed_in = action.payload;
      },
   },
});

export const { checkExistedEmailReducer, getSignedInUserReducer } =
   authReducer.actions;

export default authReducer.reducer;
