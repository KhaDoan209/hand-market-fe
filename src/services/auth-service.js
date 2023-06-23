import { http } from './axios-interceptor';
import { toast } from 'react-hot-toast';
import { toastPromise } from '../utils/toast';
export const loginService = (body) => {
   return toastPromise(
      http.post(`/auth/login`, body),
      'Signing in',
      'Sign in successfully'
   );
};
