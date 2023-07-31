import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import { convertToCurrency } from '../utils/utils-functions';

const OrderCard = ({ item }) => {
   console.log(item);
   return (
      <div className='border border-gray-300 rounded-lg'>
         <div className='flex w-full justify-between px-2 py-3 border-b border-gray-300 bg-gray-100 rounded-t-lg'>
            <div className='text-[#374b73] flex justify-between w-full px-4'>
               <h1 className='tracking-wide '>
                  ORDER #<b>{item?.order_code}</b>
               </h1>
               <Link className='text-md cursor-pointer hover:underline'>
                  View order detail
               </Link>
            </div>
         </div>
         <div className='flex w-full my-5 px-2'>
            <div className='w-2/5 mx-4 relative text-[#374b73]'>
               <h2 className='tracking-wider text-black'>CUSTOMER</h2>
               <h2 className='font-bold hover:opacity-80 cursor-pointer inline'>
                  {item?.User?.first_name}&nbsp;{item?.User?.last_name}
               </h2>
            </div>
            <div className='w-2/5 mx-4 text-[#374b73]'>
               <h2 className='tracking-wider text-black'>PLACED AT</h2>
               <h2 className='font-bold'>
                  {moment(item?.order_date).format('LLLL')}
               </h2>
            </div>
         </div>
         <div className='flex w-full my-5 px-2'>
            <div className='w-2/5 mx-4 text-[#374b73]'>
               <h2 className='tracking-wider text-black'>TOTAL</h2>
               <h2 className='font-bold'>
                  {convertToCurrency(Number(item?.order_total))}
               </h2>
            </div>
            <div className='w-2/5 mx-4 text-[#374b73]'>
               <h2 className='tracking-wider text-black'>SHIPPING ADDRESS</h2>
               <div className='font-bold'>
                  <h2>{item?.street}</h2>
                  <h2>
                     {item?.ward}, {item?.district}
                  </h2>
                  <h2>{item?.province}</h2>
               </div>
            </div>
         </div>
         <div className='flex w-full my-5 px-2'>
            <div className='w-2/5 mx-4 text-[#374b73]'>
               <h2 className='tracking-wider text-black'>STATUS</h2>
               <h2 className='font-bold text-green-500'>
                  {item?.status.toUpperCase()}
               </h2>
            </div>
            <div className='w-2/5 mx-4 text-[#374b73]'>
               <h2 className='tracking-wider text-black'>PAYMENT STATUS</h2>
               <h2 className='font-bold text-green-500'>
                  {item?.payment_status}
               </h2>
            </div>
         </div>
      </div>
   );
};

export default OrderCard;
