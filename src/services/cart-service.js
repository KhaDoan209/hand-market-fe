import { http } from './axios-interceptor';

export const getItemCartByUserService = (userId, pageNumber, pageSize) => {
   return http.get(
      `/cart/get-item-by-user/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
   );
};
export const addItemToCartService = (data) => {
   return http.post('/cart/add-item-to-cart', data);
};

export const decreaseItemQuantityService = (data) => {
   return http.post('/cart/decrease-item-quantity', data);
};

export const removeItemFromCartService = (data) => {
   return http.post('/cart/remove-item-from-cart', data);
};
