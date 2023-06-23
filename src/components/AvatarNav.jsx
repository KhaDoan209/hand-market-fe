import React from 'react';
import { useState, useEffect } from 'react';
import alterAvatar from '../assets/img/alter-ava.png';
import { getUserFromLocal } from '../utils/utils-functions';
const AvatarNav = () => {
   const [openMenu, setOpenMenu] = useState(false);
   const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
   });
   const signedInUser = getUserFromLocal();
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
      setOpenMenu(false);
   }, [windowSize.width]);
   return (
      <div className='order-1 items-center md:order-2'>
         <button
            type='button'
            className='flex mr-3 text-sm rounded-full md:mr-0 py-1 px-1 focus:bg-[#ffdeb4]'
            id='user-menu-button'
         >
            <img
               onClick={() => {
                  setOpenMenu(!openMenu);
               }}
               className='w-10 h-10 rounded-full'
               src={signedInUser.avatar ? signedInUser.avatar : alterAvatar}
               alt='user photo'
            />
         </button>
         {openMenu ? (
            <div className='absolute z-50 right-28 md:right-12 md:top-16 py-2 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg shadow-gray-800 dark:bg-gray-700 dark:divide-gray-600 w-fit md:min-w-[200px]'>
               <div className='px-4 py-3'>
                  <span className='inline text-md text-[#374b73] font-bold dark:text-white cursor-pointer hover:text-opacity-90'>
                     {signedInUser?.first_name}&nbsp;{signedInUser?.last_name}
                  </span>
                  <span className='block text-sm  text-gray-500 truncate dark:text-gray-400'>
                     {signedInUser?.email}
                  </span>
               </div>
               <ul
                  className='py-2'
                  aria-labelledby='user-menu-button'
               >
                  <li>
                     <a
                        href='#'
                        className='block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                     >
                        Sign out
                     </a>
                  </li>
               </ul>
            </div>
         ) : (
            <></>
         )}
      </div>
   );
};

export default AvatarNav;
