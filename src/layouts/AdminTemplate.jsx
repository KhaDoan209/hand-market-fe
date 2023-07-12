import React from 'react';
import { Link as ReactLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';
import { useEffect, useState } from 'react';
import { getUserFromLocal } from '../utils/utils-functions';
import { Admin } from '../utils/variables';
import notFound from '../assets/img/not_found.jpg';
import { Link } from '@chakra-ui/react';
const AdminTemplate = () => {
   const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
   });
   const [showBanner, setShowBanner] = useState(false);
   const [isAdmin, setIsAdmin] = useState(false);
   const [showOverLay, setShowOverLay] = useState(false);
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
   const handleShowOverlay = (showOverLay) => {
      setShowOverLay(showOverLay);
   };
   useEffect(() => {
      const user = getUserFromLocal();
      if (user?.role !== Admin || user === null) {
         navigate('/');
      } else {
         setIsAdmin(true);
      }
   }, []);

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
      if (windowSize.width < 768) {
         setShowBanner(true);
         setShowOverLay(false);
      } else {
         setShowBanner(false);
      }
   }, [windowSize.width]);
   return (
      <>
         {isAdmin ? (
            <>
               <Helmet>
                  <meta charSet='utf-8' />
                  <title>{generateMetaData()} - Hand Market</title>
                  <link
                     rel='canonical'
                     href='http://mysite.com/example'
                  />
               </Helmet>
               {showBanner ? (
                  <>
                     <div className='h-screen'>
                        <div className='h-4/5 flex flex-col justify-center my-auto'>
                           <img
                              className='object-cover'
                              src={notFound}
                           />
                           <h1 className='mx-2 text-center text-[#374b73] font-semibold'>
                              Sorry, this function is unavailable on mobile
                              screen
                           </h1>
                           <Link
                              className='mx-2 text-center text-lg underline font-semibold mt-2'
                              as={ReactLink}
                              to='/'
                           >
                              <span className='text-[#374b73] underline'>
                                 Back to home
                              </span>
                           </Link>
                        </div>
                     </div>
                  </>
               ) : (
                  <>
                     <div className='relative'>
                        <NavBar
                           logo={false}
                           navigate={navigate}
                           dispatch={dispatch}
                        />
                        {showOverLay ? <div className='overlay'></div> : ''}
                        <div
                           className={`fixed left-0 top-0  z-[1000] ${
                              showOverLay ? 'slide-in' : 'slide-out'
                           }`}
                        >
                           <SideBar
                              handleShowOverlay={handleShowOverlay}
                              showOverLay={showOverLay}
                              navigate={navigate}
                              dispatch={dispatch}
                           />
                        </div>
                     </div>

                     <div className='w-11/12 mx-auto'>
                        <Outlet context={{ navigate, dispatch }} />
                     </div>
                  </>
               )}
            </>
         ) : (
            <></>
         )}
      </>
   );
};

export default AdminTemplate;
