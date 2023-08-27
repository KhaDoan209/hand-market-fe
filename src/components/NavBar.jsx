'use client';
import React, { Fragment } from 'react';
import Logo from '../assets/img/brand-logo.png';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import AvatarNav from './AvatarNav';
import { Admin, Shipper, User } from '../utils/variables';
import NumberCircle from './NumberCircle';
import statisticIcon from '../assets/svg/statistics.svg';
import {
   ShoppingCartIcon,
   BellAlertIcon,
   HomeIcon,
   TagIcon,
   DocumentTextIcon,
   UserIcon,
   ChatBubbleOvalLeftEllipsisIcon,
   PresentationChartLineIcon,
} from '@heroicons/react/24/solid';
import { Tooltip } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { getItemCartByUserAction } from '../redux/action/cart-action';
import Notification from './Notification';
import { getListNotificationAction } from '../redux/action/noti-action';
import { isMobile } from 'react-device-detect';
import {
   ArchiveBoxIcon,
   DocumentChartBarIcon,
   UserGroupIcon,
} from '@heroicons/react/20/solid';

const NavBar = ({ dispatch, navigate, logo }) => {
   const signedInUser = useSelector(
      (state) => state.authReducer?.user_signed_in
   );
   const listItem = [
      {
         label:
            signedInUser?.role === User || signedInUser?.role === Admin ? (
               <>
                  <HomeIcon className='w-7 h-7 mx-auto' />
                  <span className='text-sm'>Home</span>
               </>
            ) : (
               'Home'
            ),
         link: '/',
      },
      {
         label: 'Products',
         link: '/user/view-product',
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
   const itemInCart = useSelector(
      (state) => state.cartReducer.list_item_in_cart
   );
   const listNoti = useSelector((state) => state.notiReducer.list_notification);

   const [showMenuMobi, setShowMenuMobi] = useState(true);
   const [menuItem, setMenuItem] = useState(listItem);
   const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
   });
   const [showNoti, setShowNoti] = useState(false);
   const notiRef = useRef();
   useEffect(() => {
      if (signedInUser !== null) {
         let updatedListItems = listItem.filter(
            (item) => item.label !== 'Register' && item.label !== 'Login'
         );
         if (signedInUser?.role === Admin) {
            const adminNav = [
               {
                  label: (
                     <>
                        <UserGroupIcon className='w-7 h-7 mx-auto' />
                        <span className='text-sm'>Account</span>
                     </>
                  ),
                  link: '/admin/account-management',
               },
               {
                  label: (
                     <>
                        <ArchiveBoxIcon className='w-7 h-7 mx-auto' />
                        <span className='text-sm'>Product</span>
                     </>
                  ),
                  link: '/admin/product-management',
               },
               {
                  label: (
                     <>
                        <DocumentTextIcon className='w-7 h-7 mx-auto' />
                        <span className='text-sm'>Order</span>
                     </>
                  ),
                  link: '/admin/order-management',
               },
               {
                  label: (
                     <>
                        <PresentationChartLineIcon className='w-7 h-7 mx-auto' />
                        <span className='text-sm'>Statistic</span>
                     </>
                  ),
                  link: '/admin/statistic',
               },
            ];
            const navAdmin = updatedListItems.slice(0, 1).concat(adminNav);
            setMenuItem(navAdmin);
         }
         if (signedInUser?.role === User) {
            const userNav = [
               {
                  label: (
                     <>
                        <Tooltip
                           hasArrow
                           label='Product'
                        >
                           <TagIcon className='w-7 h-7 mx-auto' />
                        </Tooltip>
                        <span className='text-sm'>Product</span>
                     </>
                  ),
                  link: '/user/view-product',
               },
               {
                  label: (
                     <>
                        <Tooltip
                           hasArrow
                           label='Shopping cart'
                        >
                           <div className='z-1'>
                              <ShoppingCartIcon className='w-7 h-7 mx-auto' />
                              <div className='absolute top-[-7px] right-[-10px] z-40'>
                                 <NumberCircle
                                    number={itemInCart?.data?.length}
                                 />
                              </div>
                           </div>
                        </Tooltip>
                        <span className='text-sm'>Cart</span>
                     </>
                  ),
                  link: `/user/shopping-cart/${signedInUser?.id}`,
               },
            ];
            const navUser = updatedListItems.slice(0, 1).concat(userNav);
            setMenuItem(navUser);
         }
         if (signedInUser?.role === Shipper) {
            const shipperNav = [
               {
                  label: (
                     <div className='z-1 text-center'>
                        <HomeIcon className='w-6 h-6 mx-auto' />
                        <h1 className='text-sm'>Home</h1>
                     </div>
                  ),
                  link: `/`,
               },
               {
                  label: (
                     <div className='z-1 text-center'>
                        <BellAlertIcon className='w-6 h-6 mx-auto' />
                        <h1 className='text-sm'>Notification</h1>
                     </div>
                  ),
                  link: `/shipper/notification/${signedInUser?.id}`,
               },
               {
                  label: (
                     <div className='z-1 text-center'>
                        <ChatBubbleOvalLeftEllipsisIcon className='w-6 h-6 mx-auto' />
                        <h1 className='text-sm'>Chat</h1>
                     </div>
                  ),
                  link: `/asd`,
               },
               {
                  label: (
                     <div className='z-1 text-center'>
                        <DocumentTextIcon className='w-6 h-6 mx-auto' />
                        <h1 className='text-sm'>Order</h1>
                     </div>
                  ),
                  link: `/shipper/order-list/${signedInUser?.id}`,
               },

               {
                  label: (
                     <div className='z-1 text-center'>
                        <UserIcon className='w-6 h-6 mx-auto' />
                        <h1 className='text-sm'>Profile</h1>
                     </div>
                  ),
                  link: `/user/user-profile/${signedInUser?.id}`,
               },
            ];
            setMenuItem(shipperNav);
         }
      }
   }, [
      itemInCart?.data?.length,
      listNoti?.filter((notification) => !notification.is_read).length,
   ]);
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
   useEffect(() => {
      if (signedInUser?.id && signedInUser?.role === User) {
         dispatch(getItemCartByUserAction(signedInUser?.id));
      }
   }, []);
   useEffect(() => {
      document.addEventListener('click', handleClickOutside);
      return () => {
         document.removeEventListener('click', handleClickOutside);
      };
   }, []);

   const handleClickOutside = (event) => {
      if (notiRef.current && !notiRef.current.contains(event.target)) {
         setShowNoti(false);
      }
   };
   const showActiveStyle = () => {
      return ({ isActive }) =>
         isActive
            ? 'block py-2 px-3 md:px-0 md:py-1 text-nav md:text-sm lg:text-[16px] hover-underline rounded md:bg-transparent font-semibold active-link'
            : 'block py-2 px-3 md:px-0 md:py-1 text-nav md:text-sm lg:text-[16px] hover-underline rounded md:bg-transparent font-semibold';
   };

   return (
      <>
         {isMobile && signedInUser?.role === Shipper ? (
            <nav className='w-full bg-white border-gray-200 shadow-sm shadow-gray-400 fixed bottom-0 right-0 z-50'>
               <div className='flex justify-around'>
                  {menuItem.map((item) => {
                     return (
                        <li
                           key={Math.random()}
                           className='relative list-none py-3'
                        >
                           {item.link !== '' ? (
                              <NavLink
                                 to={item.link}
                                 className={showActiveStyle()}
                              >
                                 {item.label}
                              </NavLink>
                           ) : (
                              <></>
                           )}
                        </li>
                     );
                  })}
               </div>
            </nav>
         ) : (
            <nav className='bg-white border-gray-200 shadow-sm shadow-gray-400 w-full'>
               <div className='w-3/4 mx-auto py-3'>
                  <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto'>
                     {logo ? (
                        <Link
                           to='/'
                           className='flex items-center'
                        >
                           <img
                              src={Logo}
                              className='h-9 lg:h-20 mr-3'
                              alt='Flowbite Logo'
                           />
                        </Link>
                     ) : (
                        <></>
                     )}

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
                              showMenuMobi
                                 ? 'h-auto w-full'
                                 : 'h-0 overflow-visible'
                           } `}
                           id='nav-mobile'
                        >
                           <ul className='flex items-center flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white '>
                              {menuItem.map((item) => {
                                 return (
                                    <li
                                       key={Math.random()}
                                       className='my-4 md:my-0 relative'
                                    >
                                       {item.link !== '' ? (
                                          <NavLink
                                             to={item.link}
                                             className={showActiveStyle()}
                                             aria-current='page'
                                          >
                                             {item.label}
                                          </NavLink>
                                       ) : (
                                          <></>
                                       )}
                                    </li>
                                 );
                              })}
                              {signedInUser?.id ? (
                                 <div
                                    ref={notiRef}
                                    className='relative'
                                 >
                                    <NavLink className='block py-2 px-3 md:px-0 md:py-1 text-nav md:text-sm lg:text-[16px] hover-underline rounded md:bg-transparent font-normal'>
                                       <Tooltip
                                          hasArrow
                                          label='Notification'
                                       >
                                          <div
                                             onClick={() => {
                                                setShowNoti(!showNoti);
                                             }}
                                          >
                                             <BellAlertIcon className='w-7 h-7 mx-auto' />
                                          </div>
                                       </Tooltip>
                                       <span className='text-sm font-semibold'>
                                          Notification
                                       </span>
                                    </NavLink>
                                    <div className='absolute top-[-5px] right-[15px] z-40'>
                                       <NumberCircle
                                          number={
                                             listNoti?.filter(
                                                (notification) =>
                                                   !notification.is_read
                                             ).length
                                          }
                                       />
                                    </div>
                                    <div className='absolute z-50 top-[45px] right-[-110px] md:right-[-15px]'>
                                       <div
                                          className={`flex justify-end duration-150 transition-all ${
                                             showNoti ? 'w-11/12' : 'opacity-0'
                                          } `}
                                       >
                                          <div className='arrow-up'></div>
                                       </div>
                                       <div
                                          id='notiDropdown'
                                          className={`bg-white duration-200 transition-all shadow-sm shadow-gray-400 rounded-md overflow-y-scroll ${
                                             showNoti
                                                ? 'h-[500px] w-[20rem] md:w-[25rem]'
                                                : 'h-0 w-[20rem] md:w-[25rem]'
                                          }`}
                                       >
                                          {showNoti &&
                                             listNoti?.map((item) => {
                                                return (
                                                   <Fragment
                                                      key={Math.random()}
                                                   >
                                                      <Notification
                                                         item={item}
                                                      />
                                                   </Fragment>
                                                );
                                             })}
                                       </div>
                                    </div>
                                 </div>
                              ) : (
                                 <></>
                              )}
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
         )}
      </>
   );
};

export default NavBar;
