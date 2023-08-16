import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getListOrderByUserAction } from '../../../redux/action/order-action';
import Pagination from '../../../components/Pagination';
import OrderCard from '../../../components/OrderCard';
const OrderManagement = () => {
   const { dispatch, navigate } = useOutletContext();
   const userSignedIn = useSelector(
      (state) => state.authReducer.user_signed_in
   );
   const listOrder = useSelector(
      (state) => state.orderReducer?.list_order_by_user
   );
   useEffect(() => {
      dispatch(getListOrderByUserAction(userSignedIn?.id));
   }, []);
   return (
      <div className='w-10/12 md:w-3/4 mx-auto bg-white my-5 px-2 py-4 md:py-10 md:px-10 rounded-md shadow-md shadow-gray-300'>
         <h1 className='text-[#374b73] text-3xl md:text-4xl font-bold mb-5 md:mb-10'>
            Your Orders
         </h1>
         {listOrder?.data?.length > 0 ? (
            <>
               {listOrder?.data.map((item) => {
                  return (
                     <div
                        className='mt-10'
                        key={Math.random()}
                     >
                        <OrderCard item={item} />
                     </div>
                  );
               })}
               <div className='w-full flex justify-end mt-5'>
                  {listOrder?.data?.length > 0 ? (
                     <Pagination
                        data={listOrder}
                        getPrevious={() => {
                           dispatch(
                              getListOrderByUserAction(
                                 userSignedIn?.id,
                                 listOrder?.previousPage,
                                 listOrder?.pageSize
                              )
                           );
                        }}
                        getNext={() => {
                           dispatch(
                              getListOrderByUserAction(
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
            </>
         ) : (
            <h1 className='text-3xl font-normal text-center text-[#374b73]'>
               You haven't purchase anything yet
            </h1>
         )}
      </div>
   );
};

export default OrderManagement;
