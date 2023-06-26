'use client';
import React from 'react';
import Logo from '../assets/img/brand-logo.png';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { getUserFromLocal } from '../utils/utils-functions';
import AvatarNav from './AvatarNav';
const NavBar = ({ dispatch, navigate }) => {
   const [showMenuMobi, setShowMenuMobi] = useState(true);
   const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
   });
   const listItem = [
      {
         label: 'Home',
         link: '/',
      },
      {
         label: 'Products',
         link: '/product',
      },
      {
         label: 'About Us',
         link: '/about',
      },
      {
         label: 'Contact',
         link: '/contact',
      },
      {
         label: 'Register',
         link: '/register',
      },
      {
         label: 'Login',
         link: '/login',
      },
   ];
   let updatedListItems = listItem;
   const signedInUser = getUserFromLocal();
   if (signedInUser !== null) {
      updatedListItems = listItem.filter(
         (item) => item.label !== 'Register' && item.label !== 'Login'
      );
   }
   useEffect(() => {
      const handleResize = () => {
         setWindowSize({
            width: window.innerWidth,
         });
      };
      window.addEventListener('resize', handleResize);
      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);
   useEffect(() => {
      if (windowSize.width > 768) {
         setShowMenuMobi(true);
      } else {
         setShowMenuMobi(false);
      }
   }, [windowSize.width]);
   const showActiveStyle = () => {
      return ({ isActive }) =>
         isActive
            ? 'block py-2 px-3 md:px-0 md:py-1 text-nav md:text-sm lg:text-[16px] hover-underline rounded md:bg-transparent md:dark:text-blue-500 font-normal font-semibold active-link'
            : 'block py-2 px-3 md:px-0 md:py-1 text-nav md:text-sm lg:text-[16px] hover-underline rounded md:bg-transparent md:dark:text-blue-500 font-normal font-semibold';
   };
   return (
      <nav className='bg-white border-gray-200 dark:bg-gray-900 shadow-sm shadow-gray-400'>
         <div className='w-3/4 mx-auto py-3'>
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto'>
               <a
                  // to='/'
                  className='flex items-center'
               >
                  <img
                     src={Logo}
                     className='h-9 lg:h-20 mr-3'
                     alt='Flowbite Logo'
                  />
               </a>
               <div></div>
               <div className='flex md:justify-center items-center'>
                  <Bars3Icon
                     onClick={() => {
                        setShowMenuMobi(!showMenuMobi);
                     }}
                     className='order-2 md:hidden border-2 rounded-md h-6 w-6 text-gray-500 font-bold cursor-pointer'
                  />
               </div>
               {showMenuMobi ? (
                  <div
                     className={` md:w-auto md:order-1 transition-all duration-300 ${
                        showMenuMobi ? 'h-auto w-full' : 'h-0'
                     } overflow-hidden`}
                     id='nav-mobile'
                  >
                     <ul className='flex items-center flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                        {updatedListItems.map((item) => {
                           return (
                              <li
                                 key={item.label}
                                 className='my-4 md:my-0 relative'
                              >
                                 <NavLink
                                    to={item.link}
                                    className={showActiveStyle()}
                                    aria-current='page'
                                 >
                                    {item.label}
                                 </NavLink>
                              </li>
                           );
                        })}
                        <AvatarNav
                           navigate={navigate}
                           dispatch={dispatch}
                        />
                     </ul>
                  </div>
               ) : (
                  <></>
               )}
            </div>
         </div>
      </nav>
   );
};

export default NavBar;
