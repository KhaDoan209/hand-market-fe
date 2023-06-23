import axios from 'axios';
export const http = axios.create({ withCredentials: true });

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
   function (response) {
      if (response.data) {
         return response.data;
      }
      return response;
   },
   function (error) {
      if (error.response.data) {
         console.log(error.response.data);
         return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
   }
);
