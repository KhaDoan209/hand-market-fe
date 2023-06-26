import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Image from '../assets/img/login-img.jpg';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const FormTemplate = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const generateMetaData = () => {
      return location.pathname
         .slice(1)
         .split(' ')
         .map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
         })
         .join(' ');
   };

   return (
      <>
         <Helmet>
            <meta charSet='utf-8' />
            <title>{generateMetaData()} - Hand Market</title>
            <link
               rel='canonical'
               href='http://mysite.com/example'
            />
         </Helmet>
         <div
            className={`grid grid-cols-12 ${
               location.pathname === '/login' ? 'h-screen' : 'h-[950px]'
            }
          `}
         >
            <div className='absolute flex top-0 right-0 md:relative md:col-span-6 lg:col-span-7 left-0 z-0 w-full height-inherit'>
               <img
                  className='object-cover object-bottom w-full h-min-[100vh] h-100%'
                  src={Image}
               />
            </div>
            <div className='relative z-10 col-span-12 md:col-span-6 lg:col-span-5 height-fit'>
               <Outlet context={{ navigate, dispatch }} />
            </div>
         </div>
      </>
   );
};

export default FormTemplate;
