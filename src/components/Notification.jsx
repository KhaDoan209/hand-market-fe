import moment from 'moment/moment';
import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NotificationType } from '../enums/NotificationType';
import { changeReadingStatusAction } from '../redux/action/noti-action';
import { getProductDetailAction } from '../redux/action/product-action';
import orderNotiImg from '../assets/img/order-noti.png';
const Notification = ({ item }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const signedInUser = useSelector(
      (state) => state.authReducer.user_signed_in
   );
   const renderTime = () => {
      return (
         <span className='text-sm text-gray-400'>
            {moment(item?.created_at).fromNow()}
         </span>
      );
   };
   const renderNotiContent = () => {
      const maxLength = 70;
      if (item?.content?.length > maxLength) {
         return item?.content.slice(0, maxLength) + '...';
      } else {
         return item?.content;
      }
   };
   const renderComponent = () => {
      switch (item?.noti_type) {
         case NotificationType.NEW_PRODUCT_AVAILABLE:
            return (
               <div
                  onClick={() => {
                     dispatch(
                        changeReadingStatusAction(signedInUser.id, item.id)
                     );
                     if (item?.link !== null) {
                        dispatch(getProductDetailAction(Number(item?.link)));
                        navigate(`user/view-product-detail/${item?.link}`);
                     }
                  }}
                  className='bg-white px-3 py-1 rounded-md cursor-pointer hover:bg-gray-100 border-b border-gray-300'
               >
                  <div className='py-3 flex items-center'>
                     <img
                        className='w-16 h-16 rounded-sm object-cover'
                        src={item?.Product?.image}
                     />
                     <div className='mx-2'>
                        <div className='text-[#374b73]'>
                           {renderNotiContent()}
                        </div>
                        <div className='flex'>{renderTime()}</div>
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
         case NotificationType.ORDER_PLACED:
            return (
               <div
                  onClick={() => {
                     dispatch(
                        changeReadingStatusAction(signedInUser.id, item.id)
                     );
                     // if (item?.link !== null) {
                     //    dispatch(getProductDetailAction(Number(item?.link)));
                     //    navigate(`user/view-product-detail/${item?.link}`);
                     // }
                  }}
                  className='bg-white px-3 py-1 rounded-md cursor-pointer hover:bg-gray-100 border-b border-gray-300'
               >
                  <div className='py-3 flex items-center'>
                     <img
                        className='w-16 h-16 rounded-sm object-cover'
                        src={orderNotiImg}
                     />
                     <div className='mx-2'>
                        <div className='text-[#374b73]'>
                           {renderNotiContent()}
                        </div>
                        <div className='flex'>{renderTime()}</div>
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
   return <div>{renderComponent()}</div>;
};

export default Notification;
