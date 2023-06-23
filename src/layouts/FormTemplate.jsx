import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Image from '../assets/img/login-img.jpg';
import { useDispatch } from 'react-redux';
const FormTemplate = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   return (
      <>
         <div className='grid grid-cols-12'>
            <div className='absolute top-0 right-0 md:relative md:col-span-6 lg:col-span-7 left-0 z-0'>
               <img
                  className='object-cover object-bottom h-screen w-full'
                  src={Image}
               />
            </div>
            <div className='relative z-10 col-span-12 md:col-span-6 lg:col-span-5'>
               <Outlet context={{ navigate, dispatch }} />
            </div>
         </div>
      </>
   );
};

export default FormTemplate;
