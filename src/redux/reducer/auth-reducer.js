import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   userLogedIn: {},
};

const authReducer = createSlice({
   name: 'authReducer',
   initialState,
   reducers: {},
});

export const { loginReducer } = authReducer.actions;

export default authReducer.reducer;
