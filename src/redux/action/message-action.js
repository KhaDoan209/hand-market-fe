import {
   getConversationDetailService,
   getConversationMessageService,
   getListConversationByUserService,
   getListUnseenMessageService,
   seenMessageService,
   sendMessageService,
} from '../../services/message-service';
import {
   getConversationMessageReducer,
   getListConversationByUserReducer,
   getConversationDetailReducer,
   clearConversationReducer,
   getListUnseenMessageReducer,
   getCurrentConversationIdReducer,
   clearCurrentConversationIdReducer,
} from '../reducer/message-reducer';

export const getListConversationByUserAction = (
   userId,
   pageNumber = 1,
   pageSize = 10
) => {
   return async (dispatch) => {
      try {
         const result = await getListConversationByUserService(
            userId,
            pageNumber,
            pageSize
         );
         dispatch(getListConversationByUserReducer(result.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const getConversationDetailAction = (conversationId) => {
   return async (dispatch) => {
      try {
         const result = await getConversationDetailService(conversationId);
         dispatch(getConversationDetailReducer(result.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const getConversationMessageAction = (
   conversationId,
   pageNumber = 1,
   pageSize = 10
) => {
   return async (dispatch) => {
      try {
         const result = await getConversationMessageService(
            conversationId,
            pageNumber,
            pageSize
         );
         dispatch(getConversationMessageReducer(result.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const getCurrentConversationIdAction = (id) => {
   return (dispatch) => {
      try {
         dispatch(getCurrentConversationIdReducer(id));
      } catch (error) {
         console.log(error);
      }
   };
};

export const sendMessageAction = (message) => {
   return async () => {
      try {
         await sendMessageService(message);
      } catch (error) {
         console.log(error);
      }
   };
};

export const clearConversationAction = () => {
   return (dispatch) => {
      try {
         dispatch(clearConversationReducer());
      } catch (error) {
         console.log(error);
      }
   };
};

export const clearCurrentConversationIdAction = () => {
   return (dispatch) => {
      try {
         dispatch(clearCurrentConversationIdReducer());
      } catch (error) {
         console.log(error);
      }
   };
};

export const seenMesageAction = (userId, conversationId) => {
   return async (dispatch) => {
      try {
         await seenMessageService(userId, conversationId);
      } catch (error) {
         console.log(error);
      }
   };
};

export const getListUnseenMessageAction = (userId) => {
   return async (dispatch) => {
      try {
         const result = await getListUnseenMessageService(userId);
         dispatch(getListUnseenMessageReducer(result.data));
      } catch (error) {
         console.log(error);
      }
   };
};
