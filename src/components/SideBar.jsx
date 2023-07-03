import React, { Fragment } from 'react';
import Logo from '../assets/img/brand-logo.png';
import { Link, Navigate, NavLink, useOutletContext } from 'react-router-dom';
import homeIcon from '../assets/svg/home.svg';
import usersIcon from '../assets/svg/users.svg';
import productIcon from '../assets/svg/product.svg';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
const SideBar = ({ dispatch, navigate }) => {
   const [openProduct, setOpenProduct] = useState(false);
   const [openUser, setOpenUser] = useState(false);
   const listItem = [
      {
         id: 1,
         label: 'Home',
         link: '/',
         icon: homeIcon,
         subItem: [],
      },
      {
         id: 2,
         label: 'Account',
         link: '/admin/account-management',
         icon: usersIcon,
         subItem: [
            {
               label: 'Deleted Account',
               link: '/admin/account-management/deleted-account',
               icon: <TrashIcon />,
            },
         ],
         open: () => {
            setOpenProduct(!openProduct);
         },
         idOpen: openProduct,
      },
      {
         id: 3,
         label: 'Product',
         link: '/product-management',
         icon: productIcon,
         subItem: [
            {
               label: 'Create Product',
               link: '/create-product',
               icon: <UserPlusIcon />,
            },
         ],
         open: () => {
            setOpenUser(!openUser);
         },
         idOpen: openUser,
      },
   ];
   const showActiveStyle = () => {
      return ({ isActive }) =>
         isActive
            ? 'flex items-center w-full p-2 rounded-lg group hover:bg-gray-100 bg-gray-100 text-[#374b73]'
            : 'flex items-center w-full p-2 rounded-lg group hover:bg-gray-100 text-[#374b73]';
   };
   return (
      <>
         <aside
            id='logo-sidebar'
            className='relative w-full bg-white border-r border-gray-200 sm:translate-x-0 h-full'
            aria-label='Sidebar'
         >
            <div className='px-3 pb-4 overflow-y-auto bg-white h-full'>
               <Link
                  to='/'
                  className='flex items-center'
               >
                  <img
                     src={Logo}
                     className='h-9 lg:h-20 mx-5 my-2'
                     alt='Flowbite Logo'
                  />
               </Link>
               <ul className='space-y-2 mt-4 ml-4 font-medium'>
                  {listItem.map((item) => {
                     if (item.subItem.length == 0) {
                        return (
                           <Fragment key={item.id}>
                              <li>
                                 <NavLink
                                    to={item.link}
                                    className={showActiveStyle()}
                                 >
                                    <img
                                       src={item.icon}
                                       className='w-4 h-4 lg:w-7 lg:h-7 mr-1'
                                    />
                                    <span className='text-sm ml-1 lg:ml-3 lg:text-lg'>
                                       {item.label}
                                    </span>
                                 </NavLink>
                              </li>
                           </Fragment>
                        );
                     } else {
                        return (
                           <Fragment key={item.id}>
                              <li className='rounded-lg'>
                                 <button
                                    onClick={item.open}
                                    type='button'
                                    className='flex items-center w-full justify-between transition duration-75 rounded-lg group hover:bg-gray-100 '
                                 >
                                    <span
                                       className='flex items-center py-2 px-2  hover:bg-gray-100 '
                                       onClick={() => {
                                          navigate(item.link);
                                       }}
                                    >
                                       <img
                                          src={item.icon}
                                          className='w-4 h-4 lg:w-7 lg:h-7 mr-1'
                                       />
                                       <span className='text-sm ml-1 lg:ml-3 lg:text-lg text-[#374b73]'>
                                          {item.label}
                                       </span>
                                    </span>
                                    <ChevronDownIcon className='text-[#374b73] h-5 w-5 font-bold mr-2 hidden lg:inline-block' />
                                 </button>
                                 {item.idOpen ? (
                                    <ul className='py-2 space-y-2'>
                                       {item.subItem?.map((item) => {
                                          return (
                                             <Fragment key={item.link}>
                                                <li>
                                                   <NavLink
                                                      to={item.link}
                                                      className={showActiveStyle()}
                                                   >
                                                      <span
                                                         className='flex text-md items-center py-1 px-2 pl-2 lg:pl-8 hover:bg-gray-100 text-[#374b73]'
                                                         sidebar-toggle-item='true'
                                                      >
                                                         <div className='w-6 :h-6 mr-1'>
                                                            {item.icon}
                                                         </div>
                                                         <span className='text-[14px] lg:text-[16px] ml-1'>
                                                            {item.label}
                                                         </span>
                                                      </span>
                                                   </NavLink>
                                                </li>
                                             </Fragment>
                                          );
                                       })}
                                    </ul>
                                 ) : (
                                    <></>
                                 )}
                              </li>
                           </Fragment>
                        );
                     }
                  })}
               </ul>
            </div>
         </aside>
      </>
   );
};

export default SideBar;
