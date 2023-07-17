import { getListDiscountService } from '../../services/discount-service';
import { getListDiscountReducer } from '../reducer/discount-reducer';

export const getListDiscountAction = () => {
   return async (dispatch) => {
      try {
         const list_discount = await getListDiscountService();
         dispatch(getListDiscountReducer(list_discount.data));
      } catch (error) {
         console.log(error);
      }
   };
};
