import { http } from './axios-interceptor';

export const getListDiscountService = () => {
   return http.get(`/discount/get-list-discount`);
};
