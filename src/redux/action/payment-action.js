import { createPaymentIntentService } from '../../services/payment-service';
import { getPaymenInstantReducer } from '../reducer/payment-reducer';

export const createPaymentIntentAction = (body, customerPaymentId) => {
   return async (dispatch) => {
      try {
         const data = await createPaymentIntentService(body, customerPaymentId);
         console.log(data);
         dispatch(getPaymenInstantReducer(data));
      } catch (error) {
         console.log(error);
      }
   };
};
