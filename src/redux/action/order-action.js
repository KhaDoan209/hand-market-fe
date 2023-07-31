import toast from 'react-hot-toast';
import { getItemCartByUserService } from '../../services/cart-service';
import {
   createNewOrderService,
   getListOrderByUserService,
} from '../../services/order-service';
import { getItemCartByUserReducer } from '../reducer/cart-reducer';
import { getListOrderByUserReducer } from '../reducer/order-reducer';

export const getListOrderByUserAction = (
   userId,
   pageNumber = 1,
   pageSize = 8
) => {
   return async (dispatch) => {
      try {
         const listOrderByUser = await getListOrderByUserService(
            userId,
            pageNumber,
            pageSize
         );
         dispatch(getListOrderByUserReducer(listOrderByUser.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const createNewOrderAction = (
   navigate,
   data,
   pageNumber = 1,
   pageSize = 8
) => {
   return async (dispatch) => {
      try {
         const { user_id } = data;
         await createNewOrderService(data);
         localStorage.removeItem('listCart');
         setTimeout(() => {
            navigate('/user/order-complete');
         }, 500);
         const cart = await getItemCartByUserService(
            user_id,
            pageNumber,
            pageSize
         );
         dispatch(getItemCartByUserReducer(cart.data));
      } catch (error) {
         console.log(error);
      }
   };
};
