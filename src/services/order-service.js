import toast from 'react-hot-toast';
import { http } from './axios-interceptor';

export const getListOrderService = (
   pageNumber = '',
   pageSize = '',
   orderStatus = ''
) => {
   return http.get(
      `/order/get-list-order?pageNumber=${pageNumber}&pageSize=${pageSize}&orderStatus=${orderStatus}`
   );
};

export const getListOrderByUserService = (userId, pageNumber, pageSize) => {
   return http.get(
      `/order/get-order-by-user/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
   );
};

export const getListOrderByUserForAdminService = (userId, orderStatus) => {
   if (orderStatus) {
      return http.get(
         `/order/get-list-order-by-user-for-admin/${userId}?orderStatus=${orderStatus}`
      );
   } else {
      return http.get(`/order/get-list-order-by-user-for-admin/${userId}`);
   }
};

export const createNewOrderService = (data) => {
   return toast.promise(http.post(`order/create-new-order`, data), {
      loading: 'Your order is processing...',
      success: () => 'Your order has been placed',
      error: ({ message }) => `${message.toString()}`,
   });
};

export const getListPendingDeliveryOrderService = () => {
   return http.get(`/order/get-list-pending-delivery-order`);
};

export const getListWaitingDoneOrderService = (shipperId) => {
   return http.get(`/order/get-list-waiting-done-order/${shipperId}`);
};

export const getOrderInProgressService = (shipperId) => {
   return http.get(`/order/get-order-in-progress/${shipperId}`);
};

export const getOrderDetailService = (orderId) => {
   return http.get(`/order/get-order-detail/${orderId}`);
};

export const takeOrderService = (shipperId, orderId) => {
   return toast.promise(
      http.post(
         `/order/take-an-order/?shipperId=${shipperId}&orderId=${orderId}`
      ),
      {
         loading: 'Wait a sec!',
         success: (message) => `${message}`,
         error: (error) => `${error}`,
      },
      {
         duration: 1000,
      }
   );
};

export const changeOrderStatusService = (data) => {
   return toast.promise(http.post(`/order/change-order-status`, data), {
      loading: 'Wait a sec!',
      success: (result) => `${result.message}`,
      error: (error) => `${error.message}`,
   });
};

export const cancelOrderService = (data) => {
   return http.post(`/order/cancel-order`, data);
};
