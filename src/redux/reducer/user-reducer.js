import { createSlice } from '@reduxjs/toolkit';
import { current } from '@reduxjs/toolkit';
const initialState = {
   list_user: {},
   user_detail: {},
   list_deleted_user: [],
};

const userReducer = createSlice({
   name: 'userReducer',
   initialState,
   reducers: {
      getListUserReducer: (state, action) => {
         state.list_user = action.payload;
      },
      getUserDetailReducer: (state, action) => {
         state.user_detail = action.payload;
      },
      getListDeletedUserReducer: (state, action) => {
         state.list_deleted_user = action.payload;
      },
   },
});

export const {
   getListUserReducer,
   getUserDetailReducer,
   getListDeletedUserReducer,
} = userReducer.actions;

export default userReducer.reducer;
