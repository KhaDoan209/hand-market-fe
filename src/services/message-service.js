import { http } from './axios-interceptor';

export const getListConversationByUserService = (
   userId,
   pageNumber,
   pageSize
) => {
   return http.get(
      `/message/get-list-conversation/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
   );
};

export const getConversationDetailService = (conversationId) => {
   return http.get(`/message/get-conversation-detail/${conversationId}`);
};

export const getConversationMessageService = (
   conversationId,
   pageNumber,
   pageSize
) => {
   return http.get(
      `/message/get-conversation-message/${conversationId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
   );
};

export const sendMessageService = (body) => {
   return http.post('/message/send-message', body);
};

export const seenMessageService = (userId, conversationId) => {
   return http.post(
      `/message/seen-message?userId=${userId}&conversationId=${conversationId}`
   );
};

export const getListUnseenMessageService = (userId) => {
   return http.get(`/message/count-unseen-message/${userId}`);
};
