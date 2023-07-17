import { http } from './axios-interceptor';

export const getListProductService = (pageNumber, pageSize) => {
   return http.get(
      `/product/get-list-product?pageNumber=${pageNumber}&pageSize=${pageSize}`
   );
};

export const getListProductByPurchaseService = (pageNumber, pageSize) => {
   return http.get(
      `/product/get-list-product-by-purchase?pageNumber=${pageNumber}&pageSize=${pageSize}`
   );
};

export const getProductDetailService = (id) => {
   return http.get(`/product/get-product-detail/${id}`);
};

export const createNewProductService = (data) => {
   return http.post(`/product/create-new-product`, data);
};

export const updateProductInformationService = (data, id) => {
   return http.post(`/product/update-product-information/${id}`, data);
};

export const changeProductImageService = (data, id) => {
   return http.post(`/product/upload-product-image/${id}`, data);
};

export const deleteProductService = (id) => {
   return http.delete(`/product/delete-product/${id}`);
};
