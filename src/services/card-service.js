import toast from 'react-hot-toast';
import { http } from './axios-interceptor';

export const getListSavedCardService = (customerStripeId) => {
   return http.get(`/credit-card/get-list-saved-card/${customerStripeId}`);
};

export const createNewCardService = (data, id) => {
   return toast.promise(http.post(`/credit-card/add-new-card/${id}`, data), {
      loading: 'Uploading, wait a sec!',
      success: () => 'New card has been added',
      error: (err) => `${err.message.toString()}`,
   });
};

export const deleteSavedCardService = (customerStripeId, cardId) => {
   return toast.promise(
      http.delete(
         `/credit-card/delete-saved-card/?customerStripeId=${customerStripeId}&cardId=${cardId}`
      ),
      {
         loading: 'Wait a sec !',
         success: () => 'Card has been removed',
      }
   );
};
