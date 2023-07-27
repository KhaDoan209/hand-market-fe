import toast from 'react-hot-toast';
import {
   createNewCardService,
   deleteSavedCardService,
   getListSavedCardService,
} from '../../services/card-service';
import { getListSavedCardReducer } from '../reducer/card-reducer';

export const getListSavedCardAction = (customerStripeId) => {
   return async (dispatch) => {
      try {
         const result = await getListSavedCardService(customerStripeId);
         dispatch(getListSavedCardReducer(result));
      } catch (error) {
         console.log(error);
      }
   };
};

export const createNewCardAction = (data, id) => {
   return async (dispatch) => {
      try {
         const { customer_stripe_id } = data;
         await createNewCardService(data, id);
         const result = await getListSavedCardService(customer_stripe_id);
         console.log(result);
         dispatch(getListSavedCardReducer(result));
      } catch (error) {
         console.log(error);
      }
   };
};

export const deleteSavedCardAction = (customerStripeId, cardId) => {
   return async (dispatch) => {
      try {
         await deleteSavedCardService(customerStripeId, cardId);
         const result = await getListSavedCardService(customerStripeId);
         dispatch(getListSavedCardReducer(result));
      } catch (error) {
         console.log(error);
      }
   };
};
