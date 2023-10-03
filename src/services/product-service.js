import toast from 'react-hot-toast';
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

export const getListProductByDiscountService = (pageNumber, pageSize) => {
   return http.get(
      `/product/get-list-product-by-discount?pageNumber=${pageNumber}&pageSize=${pageSize}`
   );
};

export const getListProductByCategoryService = (id, pageNumber, pageSize) => {
   if (id) {
      return http.get(
         `/product/get-list-product-by-category?categoryId=${id}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
   } else {
      return http.get(`/product/get-list-product-by-category`);
   }
};

export const getListProductByViewService = (pageNumber, pageSize) => {
   return http.get(
      `/product/get-list-product-by-view?pageNumber=${pageNumber}&pageSize=${pageSize}`
   );
};

export const getProductDetailService = (id) => {
   return http.get(`/product/get-product-detail/${id}`);
};

export const createNewProductService = (data) => {
   return toast.promise(http.post(`/product/create-new-product`, data), {
      loading: 'Wait a sec!',
      success: () => 'Product added !',
      error: ({ message }) => `${message.toString()}`,
   });
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

export const increaseProductViewService = (id) => {
   return http.post(`/product/increase-product-view/${id}`);
};

export const getListProductByTypeService = (
   categoryId,
   types,
   pageNumber,
   pageSize
) => {
   const typeQueries = types.map((type) => `type=${type.value}`).join('&');
   return http.get(
      `/product/get-list-product-by-type?categoryId=${categoryId}&${typeQueries}&pageNumber=${pageNumber}&pageSize=${pageSize}`
   );
};

export const arrangeProductByNameService = (
   category,
   types,
   orderBy,
   pageNumber,
   pageSize
) => {
   console.log(types);
   let typeQueries = '';
   if (types.length > 0) {
      typeQueries = types.map((type) => `type=${type.value}`).join('&');
   }
   return http.get(
      `/product/arrange-product-by-name?orderBy=${orderBy}&pageNumber=${pageNumber}&pageSize=${pageSize}&categoryId=${category}&${typeQueries}`
   );
};

export const arrangeProductByPriceService = (
   category,
   types,
   orderBy,
   pageNumber,
   pageSize
) => {
   let typeQueries = '';
   if (types.length > 0) {
      typeQueries = types.map((type) => `type=${type.value}`).join('&');
   }
   return http.get(
      `/product/arrange-product-by-price?orderBy=${orderBy}&pageNumber=${pageNumber}&pageSize=${pageSize}&categoryId=${category}&${typeQueries}`
   );
};
export const arrangeProductByViewService = (
   category,
   types,
   orderBy,
   pageNumber,
   pageSize
) => {
   let typeQueries = '';
   if (types.length > 0) {
      typeQueries = types.map((type) => `type=${type.value}`).join('&');
   }
   return http.get(
      `/product/arrange-product-by-view?orderBy=${orderBy}&pageNumber=${pageNumber}&pageSize=${pageSize}&categoryId=${category}&${typeQueries}`
   );
};

export const searchProductByNameService = (name, pageNumber, pageSize) => {
   return http.get(
      `/product/search-product-by-name?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}`
   );
};
