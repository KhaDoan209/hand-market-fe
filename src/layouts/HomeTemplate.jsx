import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
const HomeTemplate = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const generateMetaData = () => {
      if (location.pathname !== '/hand-market') {
         return location.pathname
            .slice(1)
            .split(' ')
            .map(function (word) {
               return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(' ');
      } else {
         return 'Home';
      }
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
         <NavBar
            logo={true}
            navigate={navigate}
            dispatch={dispatch}
         />
         <Outlet context={{ navigate, dispatch }} />
      </>
   );
};

export default HomeTemplate;
