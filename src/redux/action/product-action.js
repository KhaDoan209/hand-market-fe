import toast from 'react-hot-toast';
import {
   getListProductService,
   createNewProductService,
   getProductDetailService,
   updateProductInformationService,
   changeProductImageService,
   deleteProductService,
   getListProductByPurchaseService,
} from '../../services/product-service';
import {
   getListProductByPurchaseReducer,
   getListProductReducer,
   getProductDetailReducer,
} from '../reducer/product-reducer';

export const getListProductAction = (pageNumber = 1, pageSize = 8) => {
   return async (dispatch) => {
      try {
         const list_product = await getListProductService(pageNumber, pageSize);
         dispatch(getListProductReducer(list_product.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const getProductDetailAction = (id) => {
   return async (dispatch) => {
      try {
         const product_detail = await getProductDetailService(id);
         dispatch(getProductDetailReducer(product_detail.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const getListProductByViewAction = (pageNumber = 1, pageSize = 8) => {
   return async (dispatch) => {
      try {
         const list_product_by_purchase = await getListProductByPurchaseService(
            pageNumber,
            pageSize
         );
         dispatch(
            getListProductByPurchaseReducer(list_product_by_purchase.data)
         );
      } catch (error) {
         console.log(error);
      }
   };
};

export const createNewProductAction = (data, pageNumber = 1, pageSize = 8) => {
   return async (dispatch) => {
      try {
         toast.loading('Wait a sec !', { duration: 4000 });
         await createNewProductService(data);
         toast.success('Product Added !', { duration: 1000 });
         const list_product = await getListProductService(pageNumber, pageSize);
         dispatch(getListProductReducer(list_product.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const updateProductInformationAction = (data, id) => {
   return async (dispatch) => {
      try {
         await updateProductInformationService(data, id);
         const product_detail = await getProductDetailService(id);
         toast.success('Product updated succesffully !');
         dispatch(getProductDetailReducer(product_detail.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const changeProductImageAction = (data, id) => {
   return async (dispatch) => {
      try {
         toast.loading('Wait a sec!', { duration: 4000 });
         await changeProductImageService(data, id);
         const product_detail = await getProductDetailService(id);
         console.log(product_detail);
         toast.success('Image changed succesffully !');
         dispatch(getProductDetailReducer(product_detail.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const deleteProductAction = (id, pageNumber = 1, pageSize = 8) => {
   return async (dispatch) => {
      try {
         await deleteProductService(id);
         toast.success('Product deleted successfully !');
         const list_product = await getListProductService(pageNumber, pageSize);
         dispatch(getListProductReducer(list_product.data));
      } catch (error) {
         console.log(error);
      }
   };
};
