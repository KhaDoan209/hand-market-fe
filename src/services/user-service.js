import { http } from './axios-interceptor';
export const getListUserService = () => {
   return http.get('/user/get-list-user');
};
