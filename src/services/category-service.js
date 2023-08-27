import { http } from './axios-interceptor';
export const getListCategoryService = () => {
   return http.get(`/category/get-list-category`);
};

export const getListProductTypeService = (id) => {
   return http.get(`/category/list-product-type/${id}`);
};

export const countProductByCategoryService = async () => {
   return await http.get('/category/count-product-by-category');
};
