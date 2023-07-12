import toast from 'react-hot-toast';
import {
   getListProductService,
   createNewProductService,
} from '../../services/product-service';
import { getListProductReducer } from '../reducer/product-reducer';
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
