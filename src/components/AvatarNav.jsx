import React from 'react';
import { useState, useEffect } from 'react';
import alterAvatar from '../assets/img/alter-ava.png';
import { getUserFromLocal } from '../utils/utils-functions';
import Modal from './Modal.jsx';
import { logoutAction } from '../redux/action/auth-action';
const AvatarNav = ({ dispatch, navigate }) => {
   const [openMenu, setOpenMenu] = useState(false);
   const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
   });
   const signedInUser = getUserFromLocal();
   let [isOpen, setIsOpen] = useState(false);
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
   const closeModal = () => {
      setIsOpen(false);
   };
   const openModal = () => {
      setIsOpen(true);
   };
   const handleLogout = () => {
      dispatch(logoutAction(signedInUser?.id, navigate));
   };
   return (
      <div className='order-1 items-center md:order-2'>
         {signedInUser ? (
            <button
               type='button'
               className='flex mr-3 text-sm rounded-full md:mr-0 py-1 px-1 focus:bg-gray-200'
               id='user-menu-button'
            >
               <img
                  onClick={() => {
                     setOpenMenu(!openMenu);
                  }}
                  className='w-11 h-11 rounded-full object-cover'
                  src={signedInUser?.avatar ? signedInUser.avatar : alterAvatar}
                  alt='user photo'
               />
            </button>
         ) : (
            <></>
         )}

         {openMenu ? (
            <div className='absolute z-50 md:top-16 py-2 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg shadow-gray-800  w-fit md:min-w-[200px]'>
               <div className='px-4 py-3'>
                  <span className='inline text-md font-bold cursor-pointer hover:text-opacity-90 text-[#374b73]'>
                     {signedInUser?.first_name}&nbsp;{signedInUser?.last_name}
                  </span>
                  <span className='block text-sm  text-gray-500 truncate '>
                     {signedInUser?.email}
                  </span>
               </div>
               <ul
                  className='py-2'
                  aria-labelledby='user-menu-button'
               >
                  <li>
                     <a
                        onClick={openModal}
                        className='block px-4 py-2 text-sm text-red-600 font-bold hover:bg-gray-100 cursor-pointer'
                     >
                        Sign out
                     </a>
                  </li>
               </ul>
            </div>
         ) : (
            <></>
         )}
         <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            title='sign out'
            message='Since you left, we will miss you very much 😭'
            actionContent='Sign Out'
            actionImplement={handleLogout}
         />
      </div>
   );
};

export default AvatarNav;
