import React, { Fragment } from 'react';
import Logo from '../assets/img/brand-logo.png';
import { Link, NavLink, useLocation } from 'react-router-dom';
import homeIcon from '../assets/svg/home.svg';
import usersIcon from '../assets/svg/users.svg';
import productIcon from '../assets/svg/product.svg';
import addProduct from '../assets/svg/add-product.svg';
import orderIcon from '../assets/svg/order.svg';
import statisticsIcon from '../assets/svg/statistics.svg';
import trash from '../assets/svg/trash.svg';
import {
   Bars3BottomLeftIcon,
   ChevronDownIcon,
   Bars3BottomRightIcon,
   DocumentTextIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
const SideBar = ({ dispatch, navigate, handleShowOverlay, showOverLay }) => {
   const [hiddenSideBar, setHiddenSideBar] = useState(true);
   const url = useLocation();
   const [openProduct, setOpenProduct] = useState(false);
   const [openUser, setOpenUser] = useState(false);
   const [openOrder, setOpenOrder] = useState(false);
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
               icon: trash,
            },
         ],
         open: () => {
            setOpenUser(true);
         },
         close: () => {
            setOpenUser(false);
         },
         idOpen: openUser,
      },
      {
         id: 3,
         label: 'Product',
         link: '/admin/product-management',
         icon: productIcon,
         subItem: [
            {
               label: 'Add Product',
               link: '/admin/product-management/new-product',
               icon: addProduct,
            },
         ],
         open: () => {
            setOpenProduct(true);
         },
         close: () => {
            setOpenProduct(false);
         },
         idOpen: openProduct,
      },
      {
         id: 4,
         label: 'Order',
         link: '/admin/order-management',
         icon: orderIcon,
         subItem: [],
         open: () => {
            setOpenOrder(true);
         },
         close: () => {
            setOpenOrder(false);
         },
         idOpen: openOrder,
      },
      {
         id: 5,
         label: 'Statistic',
         link: '/admin/statistic',
         icon: statisticsIcon,
         subItem: [],
      },
   ];
   const showActiveStyle = () => {
      return ({ isActive }) =>
         isActive
            ? 'flex items-center w-full p-2 rounded-lg group hover:bg-gray-100  text-[#374b73]'
            : 'flex items-center w-full p-2 rounded-lg group hover:bg-gray-100 text-[#374b73]';
   };
   return (
      <aside
         className={`w-[300px] ${
            showOverLay
               ? 'bg-white lg:border-r lg:border-gray-200 lg:lg:shadow-xl lg:lg:shadow-gray-400'
               : 'bg-transparent'
         }  `}
      >
         <div
            className={`${
               hiddenSideBar ? 'px-5' : 'px-3'
            } pb-4 overflow-y-auto w-full ${
               showOverLay ? 'h-screen' : 'h-fit lg:h-[100vh]'
            }`}
         >
            <div className='flex justify-between h-24 items-center py-5'>
               <Link
                  to='/'
                  className='w-4/5 items-center'
               >
                  {hiddenSideBar ? (
                     <></>
                  ) : (
                     <img
                        src={Logo}
                        className='w-full my-4'
                     />
                  )}
               </Link>
               <button
                  onClick={() => {
                     handleShowOverlay(!showOverLay);
                     setHiddenSideBar(!hiddenSideBar);
                  }}
                  className='h-11 flex flex-col justify-center ml-5'
               >
                  <div className='w-full flex justify-center bg-white rounded-md'>
                     {hiddenSideBar ? (
                        <Bars3BottomLeftIcon className='p-1 w-10 h-10  cursor-pointer border border-gray-100 rounded-md shadow-md hover:shadow-gray-400 text-white bg-[#374b73] transition-all duration-300' />
                     ) : (
                        <Bars3BottomRightIcon className='p-1 w-10 h-10 ursor-pointer text-[#374b73] border border-gray-100 rounded-md shadow-md hover:shadow-gray-400 transition-all duration-300' />
                     )}
                  </div>
               </button>
            </div>
            <ul
               className={`space-y-2 mt-4 ml-4 font-medium ${
                  hiddenSideBar ? 'hidden' : ''
               }`}
            >
               {listItem.map((item) => {
                  if (item?.subItem?.length == 0) {
                     return (
                        <Fragment key={item.id}>
                           <li>
                              <NavLink
                                 onClick={() => {
                                    handleShowOverlay(false);
                                 }}
                                 to={item.link}
                                 className={showActiveStyle()}
                              >
                                 <img
                                    src={item.icon}
                                    className='w-4 h-4 lg:w-7 lg:h-7 mr-1'
                                 />
                                 <span
                                    onClick={() => {
                                       setHiddenSideBar(true);
                                    }}
                                    className='text-md ml-1 lg:ml-3 lg:text-lg'
                                 >
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
                                 onClick={() => {
                                    if (item.idOpen) {
                                       item.close();
                                    } else {
                                       item.open();
                                    }
                                 }}
                                 type='button'
                                 className={`flex items-center w-full justify-between transition duration-75 rounded-lg group hover:bg-gray-100 ${
                                    url.pathname == item.link
                                       ? 'bg-gray-100'
                                       : ''
                                 } `}
                              >
                                 <NavLink
                                    onClick={() => {
                                       handleShowOverlay(false);
                                       setHiddenSideBar(true);
                                    }}
                                    className={showActiveStyle()}
                                    to={item.link}
                                 >
                                    <div className='flex justify-between items-center'>
                                       <div className='flex'>
                                          <img
                                             src={item.icon}
                                             className='w-4 h-4 lg:w-7 lg:h-7 mr-1'
                                          />
                                          <span className='text-md ml-1 lg:ml-3 lg:text-lg text-[#374b73]'>
                                             {item.label}
                                          </span>
                                       </div>
                                    </div>
                                 </NavLink>
                                 <div className='px-5 py-2'>
                                    <ChevronDownIcon
                                       className={`text-[#374b73] h-5 w-5 font-bold mr-2 lg:inline-block duration-300 
                                             ${
                                                item.idOpen
                                                   ? 'rotate-180'
                                                   : 'rotate-0'
                                             } `}
                                    />
                                 </div>
                              </button>
                              {item.idOpen ? (
                                 <ul className='py-2 space-y-2'>
                                    {item.subItem?.map((item) => {
                                       return (
                                          <li
                                             onClick={() => {
                                                handleShowOverlay(false);
                                                setHiddenSideBar(true);
                                                navigate(item.link);
                                             }}
                                             key={Math.random()}
                                          >
                                             <NavLink
                                                className={showActiveStyle()}
                                             >
                                                <span className='flex text-md items-center py-1 px-2 pl-2 lg:pl-6 hover:bg-gray-100 text-[#374b73] cursor-pointer'>
                                                   <img
                                                      src={item.icon}
                                                      className='w-7 h-7 mr-1'
                                                   />
                                                   <span className='text-[14px] lg:text-[16px] ml-1'>
                                                      {item.label}
                                                   </span>
                                                </span>
                                             </NavLink>
                                          </li>
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
   );
};

export default SideBar;
