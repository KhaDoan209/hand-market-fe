import { getListUserService } from '../../services/user-service';
export const getListUserAction = () => {
   return async (dispatch) => {
      try {
         let data = await getListUserService();
         console.log(data);
      } catch (error) {
         console.log(error);
      }
   };
};
