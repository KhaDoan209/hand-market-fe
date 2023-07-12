import { http } from './axios-interceptor';
export const getListProductService = (pageNumber, pageSize) => {
   return http.get(
      `/product/get-list-product?pageNumber=${pageNumber}&pageSize=${pageSize}`
   );
};

export const createNewProductService = (data) => {
   return http.post(`/product/create-new-product`, data);
};

export const uploadProductImageService = () => {
   
}