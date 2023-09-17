import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
   changeOrderStatusAction,
   getOrderDetailAction,
} from '../../../redux/action/order-action';
import { useSelector } from 'react-redux';
import {
   ChevronDoubleRightIcon,
   CheckIcon,
   XMarkIcon,
} from '@heroicons/react/24/solid';
import { OrderStatus } from '../../../enums/OrderStatus';
import { socket } from '../../../socket';
import { SocketMessage } from '../../../enums/SocketMessage';
import moment from 'moment/moment';
import { convertToCurrency } from '../../../utils/utils-functions';
import { getUserDetailAction } from '../../../redux/action/user-action';
const OrderDetailAdmin = () => {
   const { id } = useParams();
   const { dispatch, navigate } = useOutletContext();
   const orderDetail = useSelector((state) => state.orderReducer.order_detail);
   const userDetail = useSelector((state) => state.userReducer.user_detail);
   useEffect(() => {
      dispatch(getOrderDetailAction(id));
      dispatch(getUserDetailAction(orderDetail?.order?.user_id));
   }, []);
   const renderStepper = () => {
      const steps = [
         {
            index: 1,
            title: 'Order Placed',
            done: true,
         },
         {
            index: 2,
            title: 'Shipper Found',
            done:
               orderDetail?.order?.status === OrderStatus.OutOfDelivery ||
               orderDetail?.order?.status === OrderStatus.BeingShipped ||
               orderDetail?.order?.status === OrderStatus.Delivered ||
               orderDetail?.order?.status === OrderStatus.Done
                  ? true
                  : false,
         },
         {
            index: 3,
            title: 'Item Received',
            done:
               orderDetail?.order?.status === OrderStatus.BeingShipped ||
               orderDetail?.order?.status === OrderStatus.Delivered ||
               orderDetail?.order?.status === OrderStatus.Done
                  ? true
                  : false,
         },
         {
            index: 4,
            title: 'Delivered',
            done:
               orderDetail?.order?.status === OrderStatus.Delivered ||
               orderDetail?.order?.status === OrderStatus.Done
                  ? true
                  : false,
         },
         {
            index: 5,
            title: 'Done',
            done:
               orderDetail?.order?.status === OrderStatus.Done ? true : false,
         },
      ];
      return steps.map((item) => {
         if (item.done === true) {
            return (
               <li
                  key={Math.random()}
                  className='flex-col md:flex-row md:h-fit flex items-center w-full lg:w-1/5 justify-between py-2 lg:py-0'
               >
                  <div className='flex items-center w-3/4 my-4 md:my-0'>
                     <span className='flex items-center justify-center w-8 h-8 border border-[#ffb4b4] rounded-full shrink-0 bg-[#ffb4b4] text-white'>
                        {item.index}
                     </span>
                     <span className='ml-4 text-[#5a6e8c] text-ellipsis'>
                        <h3 className='font-medium leading-tight mb-1'>
                           {item.title}
                        </h3>
                        <p className='text-sm'>{item.description}</p>
                     </span>
                  </div>
                  {item.index === steps.length ? (
                     <></>
                  ) : (
                     <ChevronDoubleRightIcon className='hidden lg:w-6 lg:h-6 lg:block text-[#ffb4b4] rotate-90 md:rotate-0' />
                  )}
               </li>
            );
         } else {
            return (
               <li
                  key={Math.random()}
                  className='flex-col md:flex-row flex items-center w-full lg:w-1/5 justify-between py-2 lg:py-0'
               >
                  <div className='flex items-center w-3/4 my-4 md:my-0'>
                     <span className='flex items-center justify-center w-8 h-8 border border-[#374b73] rounded-full shrink-0 text-[#374b73]'>
                        {item.index}
                     </span>
                     <span className='ml-4 text-[#374b73] text-justify'>
                        <h3 className='font-medium leading-tight mb-1'>
                           {item.title}
                        </h3>
                        <p className='text-sm'>{item.description}</p>
                     </span>
                  </div>
                  {item.index === steps.length ? (
                     <></>
                  ) : (
                     <ChevronDoubleRightIcon className='hidden lg:w-6 lg:h-6 text-[#374b73] rotate-90 md:rotate-0 lg:block' />
                  )}
               </li>
            );
         }
      });
   };
   const renderOrderTotalPrice = () => {
      let total = 0;
      orderDetail?.order?.OrderDetail?.map((item) => {
         total += Number(item?.price);
      });
      return convertToCurrency(total);
   };
   return (
      <>
         <div className='w-11/12 mx-auto my-10 bg-white shadow-md  shadow-gray-300 rounded-md px-4 py-3'>
            <div className='px-2'>
               <div className='w-full border-b-2 border-gray-300 text-[#374b73] font-semibold md:flex items-center justify-between'>
                  <div className='px-4 py-2 md:border-r-2 border-gray-200 w-full'>
                     <h1 className='text-gray-400'>Order#</h1>
                     <p className='text-lg'>{orderDetail?.order?.order_code}</p>
                  </div>
                  <div className='px-4 py-2 md:border-r-2 border-gray-200 w-full'>
                     <h1 className='text-gray-400'>Placed At</h1>
                     <p className='text-lg'>
                        {moment(orderDetail?.order?.order_date).format('LLLL')}
                     </p>
                  </div>
                  <div className='px-4 py-2 border-gray-200 w-full'>
                     <h1 className='text-gray-400'>Delivered At</h1>
                     <p className='text-lg'>
                        {moment(
                           orderDetail?.order?.expected_delivery_date
                        ).format('LLLL')}
                     </p>
                  </div>
               </div>
               <h1 className='text-gray-600 font-bold text-xl my-5'>
                  Progress:
               </h1>
               <ol className='flex-col flex lg:flex-row justify-between items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 mb-10'>
                  {orderDetail?.order?.status === OrderStatus.Canceled ? (
                     <div className='w-full text-center'>
                        <h1 className='text-2xl font-semibold w-full text-red-500'>
                           Your order has been canceled
                        </h1>
                        <p className='mt-5 font-semibold text-[#374b73]'>
                           {orderDetail?.order?.cancel_reason}
                        </p>
                     </div>
                  ) : (
                     renderStepper()
                  )}
               </ol>
            </div>
         </div>
         <div className='w-10/12 mx-auto my-10 bg-white shadow-md  shadow-gray-300 rounded-md px-4 py-3'>
            <div className='px-2'>
               <div className='w-full text-[#374b73]'>
                  <h1 className='text-2xl font-bold mt-5'>Order Information</h1>
               </div>
               <div className='w-full mt-5 text-[#374b73]'>
                  <div className='flex w-full px-1 md:px-5 justify-between mb-5'>
                     <h1 className='text-md md:text-lg lg:text-xl font-semibold w-2/4'>
                        Order by:
                     </h1>
                     <h1 className='text-md md:text-lg lg:text-xl font-semibold w-2/4'>
                        Ship to:
                     </h1>
                  </div>
                  <div className='flex'>
                     <div className='w-full lg:w-2/4 mt-2 flex items-center'>
                        <div className='flex items-center px-5'>
                           <img
                              src={userDetail?.avatar}
                              className='w-12 h-12 rounded-full'
                           />
                           <div className='ml-5'>
                              <div className='w-full flex items-center font-semibold'>
                                 <span>{userDetail?.email}</span>
                              </div>
                              <div className='w-full flex items-center font-semibold'>
                                 <span>
                                    {userDetail?.first_name}{' '}
                                    {userDetail?.last_name}
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className='w-full lg:w-2/4 flex mt-2'>
                        <span>
                           {orderDetail?.order?.street},&nbsp;
                           {orderDetail?.order?.ward},&nbsp;
                           {orderDetail?.order?.district},&nbsp;
                           {orderDetail?.order?.province}
                        </span>
                     </div>
                  </div>
               </div>
               <div className='w-full mt-10 text-[#374b73]'>
                  <div className='flex w-full px-1 md:px-5 justify-between'>
                     <h1 className='text-md md:text-lg lg:text-xl font-semibold w-2/4'>
                        Order detail
                     </h1>
                     <h1 className='text-md md:text-lg lg:text-xl font-semibold text-center w-1/4'>
                        Quantity
                     </h1>
                     <h1 className='text-md md:text-lg lg:text-xl font-semibold w-1/4 text-end'>
                        Price
                     </h1>
                  </div>
                  <div className='w-full mt-5'>
                     {orderDetail?.order?.OrderDetail?.map((item) => {
                        return (
                           <div
                              className='flex justify-between py-5 px-1 md:px-5 border-b border-gray-200'
                              key={Math.random()}
                           >
                              <p className='text-gray-500 font-semibold text-md w-2/4'>
                                 {item?.Product?.name}
                              </p>
                              <p className='text-gray-500 text-md font-semibold text-center w-1/4'>
                                 {item?.quantity}
                              </p>
                              <p className='text-gray-500 text-md font-semibold text-end w-1/4'>
                                 {convertToCurrency(Number(item?.price))}
                              </p>
                           </div>
                        );
                     })}
                     <div className='flex items-center w-full justify-between'>
                        <p className='text-gray-500 text-lg font-semibold w-2/4 md:w-1/4 px-1 md:px-5 my-5'>
                           Total:
                        </p>
                        <p className='text-gray-500 text-lg font-semibold w-2/4 md:w-1/4 px-1 md:px-5 my-5 text-end'>
                           {renderOrderTotalPrice()}
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className='w-10/12 mx-auto my-10 bg-white shadow-md  shadow-gray-300 rounded-md px-4 py-3'>
            <div className='px-2'>
               <div className='w-full text-[#374b73]'>
                  <h1 className='text-2xl font-bold mt-5'>Pick up by:</h1>
               </div>
               <div className='w-full mt-5 text-[#374b73]'>
                  {orderDetail?.shipper === null ? (
                     <h1 className='text-center text-md md:text-xl'>
                        Your order is waiting for a shipper to pick
                     </h1>
                  ) : (
                     <div className='w-9/12 flex justify-evenly items-center'>
                        <img
                           src={orderDetail?.shipper?.avatar}
                           className='w-24 h-24 object-cover rounded-full'
                        />
                        <div className='text-md'>
                           <p className='text-gray-500 font-semibold'>Name</p>
                           <p className='font-bold'>
                              {orderDetail?.shipper?.first_name}{' '}
                              {orderDetail?.shipper?.last_name}
                           </p>
                        </div>
                        <div className='text-md'>
                           <p className='text-gray-500 font-semibold'>
                              Phone Number
                           </p>
                           <p className='font-bold'>
                              {orderDetail?.shipper?.phone}
                           </p>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </>
   );
};

export default OrderDetailAdmin;
