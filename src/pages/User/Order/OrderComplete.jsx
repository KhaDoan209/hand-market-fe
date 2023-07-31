import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../../../assets/img/order_complete.png';
import facebook from '../../../assets/img/facebook.png';
import instagram from '../../../assets/img/instagram.png';
import youtube from '../../../assets/img/youtube.png';
import tiktok from '../../../assets/img/tiktok.png';
import twitter from '../../../assets/img/twitter.png';
const OrderComplete = () => {
   const navigate = useNavigate();
   const [countdown, setCountdown] = useState(5);
   useEffect(() => {
      const timer = setInterval(() => {
         setCountdown((countdown) => countdown - 1);
      }, 1000);
      setTimeout(() => {
         clearInterval(timer);
         navigate('/');
      }, 5000);
      return () => clearInterval(timer);
   }, [navigate]);

   return (
      <div className='relative mx-auto h-[95vh] w-3/5 text-center flex flex-col justify-center border-b border-gray-600'>
         <img
            className='absolute left-[-5%] bottom-[-5%] w-[400px]'
            src={image}
         />
         <div className='bg-white w-3/5 mx-auto rounded-md shadow-lg shadow-gray-300 p-5'>
            <div className='my-10'>
               <h1 className='text-[#374b73] font-bold text-7xl mb-3'>
                  THANK YOU
               </h1>
               <h2 className='text-[#ffb4b4] font-normal text-4xl italic'>
                  FOR YOUR ORDER
               </h2>
            </div>
            <p className='mb-10 text-gray-400 text-lg'>
               You will be redirect to home in{' '}
               <span className='text-red-500'>{countdown}</span> seconds
            </p>
            <p className='text-gray-500 text-md font-semibold'>Follow us on</p>
            <div className='flex w-4/5 mx-auto justify-center items-center'>
               <img
                  src={facebook}
                  className='w-10 h-10 mx-1 cursor-pointer'
               />

               <img
                  src={tiktok}
                  className='w-10 h-10 mx-1 cursor-pointer'
               />

               <img
                  src={youtube}
                  className='w-10 h-10 mx-1 cursor-pointer'
               />

               <img
                  src={twitter}
                  className='w-9 h-9 mx-1 cursor-pointer'
               />

               <img
                  src={instagram}
                  className='w-10 h-10 mx-1 cursor-pointer'
               />
            </div>
         </div>
      </div>
   );
};

export default OrderComplete;
