import moment from 'moment/moment';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useOutletContext, useParams } from 'react-router-dom';
import { NotificationType } from '../../../enums/NotificationType';
import { getUserFromLocal } from '../../../utils/utils-functions';
import orderDone from '../../../assets/img/order_done.png';
import { changeReadingStatusAction } from '../../../redux/action/noti-action';
const Notification = () => {
   const { id } = useParams();
   const { dispatch, navigate } = useOutletContext();
   const list_notification = useSelector(
      (state) => state.notiReducer.list_notification
   );
   const signedInUser = getUserFromLocal();
   const renderTime = (item) => {
      return (
         <span className='text-sm text-gray-400'>
            {moment(item?.created_at).fromNow()}
         </span>
      );
   };
   const renderComponent = (item) => {
      switch (item?.noti_type) {
         case NotificationType.ORDER_DONE:
            return (
               <div
                  onClick={() => {
                     navigate(`/shipper/order-detail/item?.Order?.id`);
                     dispatch(
                        changeReadingStatusAction(signedInUser.id, item.id)
                     );
                  }}
                  className='bg-white px-3 py-1 rounded-md cursor-pointer hover:bg-gray-100 border-b border-gray-300'
               >
                  <div className='py-3 flex items-center'>
                     <img
                        className='w-20 h-20 rounded-sm object-contain'
                        src={orderDone}
                     />
                     <div className='mx-2'>
                        <div
                           className={`text-[#374b73] ${
                              !item?.is_read ? 'font-bold' : 'font-semibold'
                           }`}
                        >
                           {item?.content}
                        </div>
                        <div className='flex'>{renderTime(item)}</div>
                     </div>
                     <div>
                        {item?.is_read ? (
                           ''
                        ) : (
                           <div className='h-3 w-3 rounded-full bg-[#ffb4b4]'></div>
                        )}
                     </div>
                  </div>
               </div>
            );
         default:
            break;
      }
   };
   return (
      <div className='w-full'>
         {list_notification?.map((item) => {
            return (
               <div key={Math.random()}>
                  <div>{renderComponent(item)}</div>
               </div>
            );
         })}
         <div className='h-[5rem]'></div>
      </div>
   );
};

export default Notification;
