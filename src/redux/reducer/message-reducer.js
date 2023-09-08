import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
   list_conversation: {
      currentPage: 0,
      nextPage: 0,
      data: [],
   },
   conversation_detail: {},
   conversation_message: {
      data: [],
      previousPage: 0,
      currentPage: 0,
      nextPage: 0,
      lastPages: 0,
      firstPage: 0,
   },
   list_unseen_message: [],
   current_conversation_id: null,
};

const messageReducer = createSlice({
   name: 'messageReducer',
   initialState,
   reducers: {
      getListConversationByUserReducer: (state, action) => {
         state.list_conversation.currentPage = action.payload?.currentPage;
         state.list_conversation.nextPage = action.payload?.nextPage;
         state.list_conversation.data = [...action.payload?.data];
         if (state.current_conversation_id == null) {
            state.current_conversation_id = action.payload.data[0].id;
         }
      },
      getConversationDetailReducer: (state, action) => {
         state.conversation_detail = action.payload;
      },
      getCurrentConversationIdReducer: (state, action) => {
         state.current_conversation_id = action.payload;
      },
      getConversationMessageReducer: (state, action) => {
         const {
            data,
            firstPage,
            lastPages,
            totalPages,
            nextPage,
            previousPage,
            currentPage,
         } = action.payload;
         state.conversation_message = {
            ...state.conversation_message,
            data: [...state.conversation_message.data, ...data],
            firstPage,
            lastPages,
            totalPages,
            nextPage,
            previousPage,
            currentPage,
         };
      },
      getListUnseenMessageReducer: (state, action) => {
         state.list_unseen_message = action.payload;
      },
      clearConversationReducer: (state, action) => {
         state.list_conversation = {
            currentPage: 0,
            nextPage: 0,
            data: [],
         };
         state.conversation_detail = {};
         state.conversation_message.data = [];
         state.conversation_message.previousPage = 0;
         state.conversation_message.currentPage = 0;
         state.conversation_message.nextPage = 0;
         state.conversation_message.lastPages = 0;
         state.conversation_message.firstPage = 0;
      },
      clearCurrentConversationIdReducer: (state, action) => {
         state.current_conversation_id = null;
         state.list_unseen_message = [];
      },
   },
});

export const {
   getListConversationByUserReducer,
   getConversationMessageReducer,
   getConversationDetailReducer,
   clearConversationReducer,
   getListUnseenMessageReducer,
   getCurrentConversationIdReducer,
   clearCurrentConversationIdReducer,
} = messageReducer.actions;

export default messageReducer.reducer;
