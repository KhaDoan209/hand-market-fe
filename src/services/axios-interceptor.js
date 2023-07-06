import axios from 'axios';
import { resetTokenService } from './auth-service';

export const http = axios.create({ withCredentials: true, silent: true });

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
         if (error.response.status === 401) {
            let result = await resetTokenService();
            if (result.status === 200) {
               const originalRequest = error.config;
               return await http.request(originalRequest);
            }
         }
         return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
   }
);
