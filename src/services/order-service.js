import toast from 'react-hot-toast';
import { http } from './axios-interceptor';

export const getListOrderByUserService = (userId, pageNumber, pageSize) => {
   return http.get(
      `/order/get-order-by-user/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
   );
};

export const createNewOrderService = (data) => {
   return toast.promise(http.post(`order/create-new-order`, data), {
      loading: 'Your order is processing...',
      success: () => 'Your order has been placed',
      error: ({ message }) => `${message.toString()}`,
   });
};
