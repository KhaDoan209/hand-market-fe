import { http } from './axios-interceptor';
import { toast } from 'react-hot-toast';
import { toastPromise } from '../utils/toast';
export const loginService = (body) => {
   return toastPromise(http.post(`/auth/login`, body), 'Signing in');
};

export const checkExistedEmailService = (email) => {
   return http.get(`/auth/check-existed-email?email=${email}`);
};

export const logoutService = (id) => {
   return http.post(`/auth/logout/${id}`);
};

export const registerService = (body) => {
   return toast.promise(http.post(`/auth/register`, body), {
      loading: 'Wait a sec !',
      success: (mess) => `${mess.message.toString()}`,
      error: (err) => `${err.message.toString()}`,
   });
};

export const resetTokenService = () => {
   return http.post('/auth/reset');
};
