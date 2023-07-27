import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   payment_intent: {},
};

const paymentReducer = createSlice({
   name: 'paymentReducer',
   initialState,
   reducers: {
      getPaymenInstantReducer: (state, action) => {
         state.payment_intent = action.payload;
      },
   },
});

export const { getPaymenInstantReducer } = paymentReducer.actions;

export default paymentReducer.reducer;
