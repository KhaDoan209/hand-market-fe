import moment from 'moment/moment';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { OrderStatus } from '../.././../enums/OrderStatus';
import alterImg from '../../../assets/img/alter-ava.png';
import mapPin from '../../../assets/img/map_pin.png';
import {
   cancelOrderAction,
   changeOrderStatusAction,
   getOrderDetailAction,
   getOrderInProgressAction,
} from '../../../redux/action/order-action';
import {
   getUserFromLocal,
   convertToCurrency,
} from '../../../utils/utils-functions';
import MobileBackButton from '../../../components/MobileBackButton';
import { getUserDetailAction } from '../../../redux/action/user-action';

const OrderDetailShipper = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const signedInUser = getUserFromLocal();
   const order_detail = useSelector((state) => state.orderReducer.order_detail);
   const checkIfDateIsLate = (dateString) => {
      const targetDate = moment(dateString);
      const currentTime = moment();
      return currentTime.isAfter(targetDate);
   };
   const renderOrderTotalPrice = () => {
      let total = 0;
      order_detail?.order?.OrderDetail?.map((item) => {
         total += Number(item?.price);
      });
      return convertToCurrency(total);
   };
   useEffect(() => {
      dispatch(getOrderDetailAction(id));
   }, []);

   return (
      <>
         <div className='text-[#374b73] order_detail?.order bg-white h-screen'>
            <div className='flex items-center pt-5'>
               <div className='mr-2'>
                  <MobileBackButton />
               </div>
               <h1 className='text-2xl font-bold'>
                  Order #{order_detail?.order?.order_code}
               </h1>
            </div>
            <div className='px-4'>
               <div className='my-4 flex text-xl items-center'>
                  <img
                     src={
                        order_detail?.order?.Order_user?.avatar
                           ? order_detail?.order?.Order_user?.avatar
                           : alterImg
                     }
                     className='w-[3.2rem] h-[3.2rem] rounded-full'
                  />

                  <div className='ml-2'>
                     <h1 className='text-md font-bold text-gray-500'>
                        {order_detail?.order?.Order_user?.first_name}{' '}
                        {order_detail?.order?.Order_user?.last_name}
                     </h1>
                     <h1 className='text-[15px] font-normal cursor-pointer text-gray-500 '>
                        {order_detail?.order?.Order_user?.phone}
                     </h1>
                  </div>
               </div>
               <div className='w-full mx-auto h-[1px] bg-gray-300 my-5'></div>
               <div className='flex items-center text-gray-400 text-sm my-5'>
                  <img
                     src={mapPin}
                     className='w-12 h-12 object-contain'
                  />
                  <h1 className='ml-2 text-[16px] text-green-500 font-bold '>
                     Ship to: {order_detail?.order?.street},{' '}
                     {order_detail?.order?.ward},{' '}
                     {order_detail?.order?.district},{' '}
                     {order_detail?.order?.province}
                  </h1>
               </div>
               <div className='flex my-5'>
                  <p className='text-md text-[#374b73] font-bold'>
                     Ordered date:
                  </p>
                  <span className='text-md ml-2 font-semibold text-yellow-400'>
                     {moment(order_detail?.order?.order_date).format('LLL')}
                  </span>
               </div>
               <div className='flex my-5'>
                  <p className='text-md text-[#374b73] font-bold'>
                     Delivery at:
                  </p>
                  <span
                     className={`ml-2 font-semibold ${
                        checkIfDateIsLate(
                           order_detail?.order?.actual_delivery_date
                        )
                           ? 'text-green-500'
                           : 'text-red-500'
                     }`}
                  >
                     {moment(order_detail?.order?.actual_delivery_date).format(
                        'LLL'
                     )}
                  </span>
               </div>
               <div className='flex my-5'>
                  <p className='text-md text-[#374b73] font-bold'>Status:</p>
                  <span
                     className={`text-md ml-2 font-semibold ${
                        order_detail?.order?.status === 'Canceled'
                           ? 'text-red-500'
                           : 'text-green-500'
                     }`}
                  >
                     {order_detail?.order?.status}
                  </span>
               </div>
               <div className='flex my-5'>
                  {order_detail?.order?.status === 'Canceled' ? (
                     <>
                        <span className='text-md text-[#374b73] font-bold'>
                           Cancel reason:
                        </span>
                        <span className='text-red-500'>
                           &nbsp;{order_detail?.order?.cancel_reason}
                        </span>
                     </>
                  ) : (
                     <></>
                  )}
               </div>
               <div className='w-full mx-auto h-[1px] bg-gray-300 my-5'></div>
               <div className='mt-2'>
                  <h1 className='text-xl font-bold my-5'>Order Detail</h1>
                  <div className='flex w-full'>
                     <p className='text-black font-semibold text-lg w-2/4'>
                        # Item
                     </p>
                     <p className='text-black font-semibold text-lg w-1/4 text-center'>
                        Q.ty
                     </p>
                     <p className='text-black font-semibold text-lg w-1/4 text-end'>
                        Price
                     </p>
                  </div>
                  <div className='my-1'>
                     {order_detail?.order?.OrderDetail?.map((item) => {
                        return (
                           <div
                              key={Math.random()}
                              className='flex w-full justify-between items-stretch my-3'
                           >
                              <p className='text-[#374b73] font-semibold w-2/4 text-sm'>
                                 {item?.Product?.name}
                              </p>
                              <p className='text-gray-500 font-semibold text-center w-1/4'>
                                 {item?.quantity}
                              </p>
                              <p className='text-gray-500 font-semibold w-1/4 text-end'>
                                 {convertToCurrency(Number(item?.price))}
                              </p>
                           </div>
                        );
                     })}
                  </div>
                  <div className='flex w-full justify-between my-4'>
                     <p className=' font-semibold text-lg'>Total price:</p>
                     <p className='text-gray-500 font-semibold'>
                        {renderOrderTotalPrice()}
                     </p>
                  </div>
               </div>
            </div>
            <div className='h-[6rem]'></div>
         </div>
      </>
   );
};

export default OrderDetailShipper;
