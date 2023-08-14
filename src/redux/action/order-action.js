import toast from 'react-hot-toast';
import { getItemCartByUserService } from '../../services/cart-service';
import {
   changeOrderStatusService,
   createNewOrderService,
   getListOrderByUserService,
   getListPendingDeliveryOrderService,
   getListWaitingDoneOrderService,
   getOrderDetailService,
   getOrderInProgressService,
   takeOrderService,
} from '../../services/order-service';
import { getItemCartByUserReducer } from '../reducer/cart-reducer';
import {
   getListOrderByUserReducer,
   getListPendingDeliveryOrderReducer,
   getListWatingDoneOrderReducer,
   getOrderDetailReducer,
   getOrderInProgressReducer,
} from '../reducer/order-reducer';

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

export const getListPendingDeliveryOrderAction = () => {
   return async (dispatch) => {
      try {
         const result = await getListPendingDeliveryOrderService();
         dispatch(getListPendingDeliveryOrderReducer(result.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const getListWaitingDoneOrderAction = (shipperId) => {
   return async (dispatch) => {
      try {
         const result = await getListWaitingDoneOrderService(shipperId);
         dispatch(getListWatingDoneOrderReducer(result.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const getOrderInProgressAction = (shipperId) => {
   return async (dispatch) => {
      try {
         const result = await getOrderInProgressService(shipperId);
         dispatch(getOrderInProgressReducer(result.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const getOrderDetailAction = (id) => {
   return async (dispatch) => {
      try {
         const result = await getOrderDetailService(id);
         dispatch(getOrderDetailReducer(result.data));
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
         }, 300);
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

export const takeOrderAction = (shipperId, orderId, inProgressTabRef) => {
   return async (dispatch) => {
      try {
         await takeOrderService(shipperId, orderId);
         const result = await getOrderInProgressService(shipperId);
         dispatch(getOrderInProgressReducer(result.data));
         inProgressTabRef.current.click();
      } catch (error) {
         console.log(error);
      }
   };
};

export const changeOrderStatusAction = (data) => {
   return async () => {
      try {
         await changeOrderStatusService(data);
      } catch (error) {
         console.log(error);
      }
   };
};
