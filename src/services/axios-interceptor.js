import axios from 'axios';
import toast from 'react-hot-toast';
import { resetTokenService } from './auth-service';
export const http = axios.create({ withCredentials: true, silent: true });
let resetTokenCount = 0;
http.interceptors.request.use(
   function (config) {
      config.baseURL = import.meta.env.VITE_BASE_URL;
      return { ...config };
   },
   function (error) {
      return Promise.reject(error);
   }
);

http.interceptors.response.use(
   async function (response) {
      if (response.data) {
         return response.data;
      }
      return response;
   },
   async function (error) {
      if (error) {
         if (
            error.response.status === 401 &&
            error.response.data.message !== 'Login session has expired'
         ) {
            if (resetTokenCount < 2) {
               resetTokenCount++;
               console.log(resetTokenCount);
               let result = await resetTokenService();
               if (result.status === 200) {
                  const originalRequest = error.config;
                  return await http.request(originalRequest);
               }
            } else {
               window.location.href = '/login';
               toast.error('Please login again');
            }
         }
         return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
   }
);
