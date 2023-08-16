import React from 'react';
import { useState, useEffect } from 'react';
import alterAvatar from '../assets/img/alter-ava.png';
import ModalLogout from './ModalLogout.jsx';
import { logoutAction } from '../redux/action/auth-action';
import { User } from '../utils/variables';
import { NavLink } from 'react-router-dom';
import { UserCircleIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/20/solid';
import { getUserFromLocal } from '../utils/utils-functions';
import { getUserDetailAction } from '../redux/action/user-action';
const AvatarNav = ({ dispatch, navigate }) => {
   const [openMenu, setOpenMenu] = useState(false);
   const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
   });
   const isUserExisted = getUserFromLocal();
   const userDetail = useSelector((state) => state.authReducer.user_signed_in);
   const [isOpen, setIsOpen] = useState(false);
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
      dispatch(logoutAction(userDetail?.id, navigate));
   };
   return (
      <div className='order-1 items-center md:order-2'>
         {isUserExisted ? (
            <button
               type='button'
               className='flex mr-0 text-sm rounded-full md:mr-3 py-1 px-1 focus:bg-gray-200'
               id='user-menu-button'
            >
               <img
                  onClick={() => {
                     setOpenMenu(!openMenu);
                  }}
                  className='w-12 h-12 rounded-full object-cover'
                  src={userDetail?.avatar ? userDetail.avatar : alterAvatar}
                  alt='user photo'
               />
            </button>
         ) : (
            <></>
         )}

         {openMenu ? (
            <div className='absolute z-50 md:top-16 py-2 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg shadow-gray-800  w-fit md:min-w-[200px]'>
               <div className='px-4 py-3 '>
                  <div className='border-b-gray-300 border-b-[1px] pb-5 block'>
                     <span className='inline text-lg font-bold cursor-pointer hover:text-opacity-90 text-[#374b73]'>
                        {userDetail?.first_name}&nbsp;
                        {userDetail?.last_name}
                     </span>
                     <span className='block text-sm text-gray-500 truncate'>
                        {userDetail?.email}
                     </span>
                  </div>
                  {userDetail?.role === User ? (
                     <>
                        <NavLink
                           onClick={() => {
                              dispatch(getUserDetailAction(userDetail?.id));
                              setOpenMenu(false);
                           }}
                           to={`/user/user-profile/${userDetail?.id}`}
                           className='flex w-full text-[#374b73] hover:bg-gray-100 rounded-lg py-2 px-2 mt-3'
                        >
                           <div className='text-md font-bold font-sans cursor-pointer hover:text-opacity-90 flex items-center '>
                              <UserCircleIcon className='w-5 h-5 mr-1' />
                              Profile
                           </div>
                        </NavLink>

                        <NavLink
                           to={`/user/order-management/${userDetail?.id}`}
                           onClick={() => {
                              setOpenMenu(false);
                           }}
                           className='flex w-full text-[#374b73] hover:bg-gray-100 rounded-lg py-2 px-2'
                        >
                           <div className='text-md font-bold font-sans cursor-pointer hover:text-opacity-90 flex items-center'>
                              <ShoppingBagIcon className='w-5 h-5 mr-1' />{' '}
                              Orders
                           </div>
                        </NavLink>
                     </>
                  ) : (
                     <></>
                  )}
               </div>
               <ul
                  className='py-2'
                  aria-labelledby='user-menu-button'
               >
                  <li>
                     <a
                        onClick={openModal}
                        className='flex w-full px-4 py-2 text-sm text-red-600 font-bold hover:bg-gray-100 cursor-pointer '
                     >
                        <ArrowLeftOnRectangleIcon className='w-5 h-5 mr-1' />
                        Sign out
                     </a>
                  </li>
               </ul>
            </div>
         ) : (
            <></>
         )}
         <ModalLogout
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
