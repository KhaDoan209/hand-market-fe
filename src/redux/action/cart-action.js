import {
   addItemToCartService,
   decreaseItemQuantityService,
   getItemCartByUserService,
   removeItemFromCartService,
} from '../../services/cart-service';
import { getItemCartByUserReducer } from '../reducer/cart-reducer';
export const getItemCartByUserAction = (
   userId,
   pageNumber = 1,
   pageSize = 8
) => {
   return async (dispatch) => {
      try {
         const cart = await getItemCartByUserService(
            userId,
            pageNumber,
            pageSize
         );
         dispatch(getItemCartByUserReducer(cart.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const addItemToCartAction = (data, pageNumber = 1, pageSize = 8) => {
   return async (dispatch) => {
      try {
         const { user_id } = data;
         await addItemToCartService(data);
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

export const decreaseItemQuantityAction = (
   data,
   pageNumber = 1,
   pageSize = 8
) => {
   return async (dispatch) => {
      try {
         const { user_id } = data;
         await decreaseItemQuantityService(data);
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

export const removeItemFromCartAction = (
   data,
   pageNumber = 1,
   pageSize = 8
) => {
   return async (dispatch) => {
      try {
         const { user_id } = data;
         await removeItemFromCartService(data);
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
