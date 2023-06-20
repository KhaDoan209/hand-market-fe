import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
const HomeTemplate = () => {
   return (
      <div>
         <NavBar />
         <Outlet />
      </div>
   );
};

export default HomeTemplate;
