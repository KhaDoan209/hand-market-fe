import { http } from './axios-interceptor';
export const getListNotificationService = (userId, pageNumber, pageSize) => {
   return http.get(
      `/notification/get-list-notification/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
   );
};

export const changeReadingStatusService = (userId, notiId) => {
   return http.post(`/notification/set-reading-status/${userId}/${notiId}`);
};
