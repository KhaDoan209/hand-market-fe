import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getListOrderByShipperAction } from '../../../redux/action/order-action';
import { getUserFromLocal } from '../../../utils/utils-functions';
import { OrderStatus } from '../../../enums/OrderStatus';
import Pagination from '../../../components/Pagination';
import moment from 'moment/moment';
const OrderList = () => {
   const userSignedIn = getUserFromLocal();
   const { dispatch, navigate } = useOutletContext();
   const listOrder = useSelector(
      (state) => state.orderReducer.list_order_by_shipper
   );
   useEffect(() => {
      dispatch(getListOrderByShipperAction(userSignedIn?.id));
   }, []);
   const renderOrderStatus = (order_status) => {
      switch (order_status) {
         case OrderStatus.OutOfDelivery:
            return (
               <h1 className='text-yellow-300 font-bold'>
                  {order_status.toUpperCase()}
               </h1>
            );
         case OrderStatus.Delivered:
            return (
               <h1 className='text-purple-500 font-bold'>
                  {order_status.toUpperCase()}
               </h1>
            );
         case OrderStatus.Canceled:
            return (
               <h1 className='text-red-500 font-bold'>
                  {order_status.toUpperCase()}
               </h1>
            );
         case OrderStatus.Freepick:
            return (
               <h1 className='text-orange-300 font-bold'>
                  {order_status.toUpperCase()}
               </h1>
            );
         case OrderStatus.Done:
            return (
               <h1 className='text-green-500 font-bold'>
                  {order_status.toUpperCase()}
               </h1>
            );
         default:
            break;
      }
   };
   return (
      <div className='bg-white min-h-screen'>
         <div className='min-h-[85vh]'>
            {listOrder?.data?.map((item) => {
               return (
                  <div
                     onClick={() => {
                        navigate(`/shipper/order-detail/${item?.id}`);
                     }}
                     key={item?.id}
                  >
                     <div className='block bg-white rounded-md px-4 py-3 w-full min-h-[120px] border-y-[0.5px] border-gray-200'>
                        <div className='flex items-center text-[#374b73] text-md font-bold'>
                           <h1 className='mx-1'>Order #</h1>
                           <p>{item?.order_code}</p>
                        </div>
                        <h1 className='text-sm font-bold ml-1 my-2 flex'>
                           <span className='text-gray-400'>Status:</span>
                           <span className='ml-1'>
                              {renderOrderStatus(item?.status)}
                           </span>
                        </h1>
                        <div className='flex ml-1 text-sm '>
                           {item?.status == OrderStatus.Canceled ? (
                              <p className='text-red-500'>Canceled at:</p>
                           ) : (
                              <p className='text-green-500'>Delivery at:</p>
                           )}
                           &nbsp;
                           <p className='font-semibold text-gray-500'>
                              {moment(item?.actual_delivery_date).format('LLL')}
                           </p>
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
         <div className='flex justify-center mt-5'>
            {listOrder?.data?.length > 0 ? (
               <Pagination
                  data={listOrder}
                  getPrevious={() => {
                     dispatch(
                        getListOrderByShipperAction(
                           userSignedIn?.id,
                           listOrder?.previousPage,
                           listOrder?.pageSize
                        )
                     );
                  }}
                  getNext={() => {
                     dispatch(
                        getListOrderByShipperAction(
                           userSignedIn?.id,
                           listOrder?.nextPage,
                           listOrder?.pageSize
                        )
                     );
                  }}
               />
            ) : (
               <></>
            )}
         </div>
         <div className='h-[6rem]'></div>
      </div>
   );
};

export default OrderList;
