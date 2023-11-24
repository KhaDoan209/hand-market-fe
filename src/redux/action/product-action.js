import toast from 'react-hot-toast';
import {
   getListProductService,
   createNewProductService,
   getProductDetailService,
   updateProductInformationService,
   changeProductImageService,
   deleteProductService,
   getListProductByPurchaseService,
   getListProductByDiscountService,
   increaseProductViewService,
   getListProductByCategoryService,
   getListProductByTypeService,
   arrangeProductByNameService,
   searchProductByNameService,
   arrangeProductByPriceService,
   arrangeProductByViewService,
   getListProductByViewService,
} from '../../services/product-service';

import {
   getListProductByPurchaseReducer,
   getListProductReducer,
   getProductDetailReducer,
   getListProductByDiscountReducer,
   getListProductForUserReducer,
   clearListProductForUserReducer,
   getListProductByViewReducer,
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

export const getListProductForUserAction = (pageNumber = 1, pageSize = 8) => {
   return async (dispatch) => {
      try {
         const list_product = await getListProductService(pageNumber, pageSize);
         dispatch(getListProductForUserReducer(list_product.data));
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
         const list_product_by_view = await getListProductByViewService(
            pageNumber,
            pageSize
         );
         dispatch(getListProductByViewReducer(list_product_by_view.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const getListProductByPurchaseAction = (
   pageNumber = 1,
   pageSize = 8
) => {
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

export const getListProductByDiscountAction = (
   pageNumber = 1,
   pageSize = 8
) => {
   return async (dispatch) => {
      try {
         const list_product_by_discount = await getListProductByDiscountService(
            pageNumber,
            pageSize
         );
         dispatch(
            getListProductByDiscountReducer(list_product_by_discount.data)
         );
      } catch (error) {
         console.log(error);
      }
   };
};

export const createNewProductAction = (data, pageNumber = 1, pageSize = 8) => {
   return async (dispatch) => {
      try {
         await createNewProductService(data);
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
         toast.loading('Wait a sec!');
         await changeProductImageService(data, id);
         const product_detail = await getProductDetailService(id);
         toast.success('Image changed successfully !');
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

export const increaseProductViewAction = (id) => {
   return async (dispatch) => {
      try {
         await increaseProductViewService(id);
         const product_detail = await getProductDetailService(id);
         dispatch(getProductDetailReducer(product_detail.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const clearListProductForUserAction = () => {
   return (dispatch) => {
      dispatch(clearListProductForUserReducer());
   };
};

export const getListProductByCategoryAction = (
   id,
   pageNumber = 1,
   pageSize = 8
) => {
   return async (dispatch) => {
      try {
         const result = await getListProductByCategoryService(
            id,
            pageNumber,
            pageSize
         );
         dispatch(getListProductForUserReducer(result.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const getListProductByTypeAction = (
   categoryId,
   type,
   pageNumber = 1,
   pageSize = 8
) => {
   return async (dispatch) => {
      try {
         const result = await getListProductByTypeService(
            categoryId,
            type,
            pageNumber,
            pageSize
         );
         dispatch(getListProductForUserReducer(result.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const arrangeProductByNameAction = (
   chosenCategory,
   chosenProductType,
   orderBy,
   pageNumber = 1,
   pageSize = 8
) => {
   return async (dispatch) => {
      try {
         const result = await arrangeProductByNameService(
            chosenCategory,
            chosenProductType,
            orderBy,
            pageNumber,
            pageSize
         );
         dispatch(getListProductForUserReducer(result.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const arrangeProductByPriceAction = (
   chosenCategory,
   chosenProductType,
   orderBy,
   pageNumber = 1,
   pageSize = 8
) => {
   return async (dispatch) => {
      try {
         const result = await arrangeProductByPriceService(
            chosenCategory,
            chosenProductType,
            orderBy,
            pageNumber,
            pageSize
         );
         dispatch(getListProductForUserReducer(result.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const searchProductByNameAction = (
   name,
   pageNumber = 1,
   pageSize = 8
) => {
   return async (dispatch) => {
      try {
         const result = await searchProductByNameService(
            name,
            pageNumber,
            pageSize
         );
         dispatch(getListProductForUserReducer(result.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const arrangeProductByViewAction = (
   chosenCategory,
   chosenProductType,
   orderBy,
   pageNumber = 1,
   pageSize = 8
) => {
   return async (dispatch) => {
      try {
         const result = await arrangeProductByViewService(
            chosenCategory,
            chosenProductType,
            orderBy,
            pageNumber,
            pageSize
         );
         dispatch(getListProductForUserReducer(result.data));
      } catch (error) {
         console.log(error);
      }
   };
};
