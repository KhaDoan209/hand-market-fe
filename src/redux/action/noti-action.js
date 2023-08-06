import {
   changeReadingStatusService,
   getListNotificationService,
} from '../../services/noti-service';
import {
   clearNotificationReducer,
   getListNotificationReducer,
} from '../reducer/noti-reducer';
export const getListNotificationAction = (
   userId,
   pageNumber = 1,
   pageSize = 8
) => {
   return async (dispatch) => {
      try {
         const list_noti = await getListNotificationService(
            userId,
            pageNumber,
            pageSize
         );
         dispatch(getListNotificationReducer(list_noti.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const changeReadingStatusAction = (userId, notiId) => {
   return async (dispatch) => {
      try {
         await changeReadingStatusService(userId, notiId);
      } catch (error) {
         console.log(error);
      }
   };
};


