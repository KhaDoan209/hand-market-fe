import toast from 'react-hot-toast';
import { getItemCartByUserService } from '../../services/cart-service';
import {
   cancelOrderService,
   changeOrderStatusService,
   createNewOrderService,
   getListOrderByShipperService,
   getListOrderByUserForAdminService,
   getListOrderByUserService,
   getListOrderService,
   getListPendingDeliveryOrderService,
   getListWaitingDoneOrderService,
   getOrderDetailService,
   getOrderInProgressService,
   takeOrderService,
} from '../../services/order-service';
import { getItemCartByUserReducer } from '../reducer/cart-reducer';
import {
   getListOrderByShipperReducer,
   getListOrderByUserForAdminReducer,
   getListOrderByUserReducer,
   getListOrderReducer,
   getListPendingDeliveryOrderReducer,
   getListWatingDoneOrderReducer,
   getOrderDetailReducer,
   getOrderInProgressReducer,
} from '../reducer/order-reducer';

export const getListOrderAction = (pageNumber, pageSize, orderStatus) => {
   return async (dispatch) => {
      try {
         const result = await getListOrderService(
            pageNumber,
            pageSize,
            orderStatus
         );
         dispatch(getListOrderReducer(result.data));
      } catch (error) {
         console.log(error);
      }
   };
};

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

export const getListOrderByShipperAction = (
   shipperId,
   pageNumber = 1,
   pageSize = 6
) => {
   return async (dispatch) => {
      try {
         const result = await getListOrderByShipperService(
            shipperId,
            pageNumber,
            pageSize
         );
         dispatch(getListOrderByShipperReducer(result.data));
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

export const takeOrderAction = (
   shipperId,
   orderId,
   inProgressTabRef = null
) => {
   return async (dispatch) => {
      try {
         await takeOrderService(shipperId, orderId);
         const result = await getOrderInProgressService(shipperId);
         dispatch(getOrderInProgressReducer(result.data));
         if (inProgressTabRef !== null) {
            inProgressTabRef.current.click();
         }
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

export const cancelOrderAction = (data) => {
   return async () => {
      try {
         await cancelOrderService(data);
         toast.success('Cancel order sucessfully');
      } catch (error) {
         console.log(error);
      }
   };
};

export const getListOrderByUserForAdminAction = (userId, orderStatus) => {
   return async (dispatch) => {
      try {
         const result = await getListOrderByUserForAdminService(
            userId,
            orderStatus
         );
         dispatch(getListOrderByUserForAdminReducer(result.data));
      } catch (error) {
         console.log(error);
      }
   };
};
