import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useOutletContext } from 'react-router-dom';
const HomeTemplate = () => {
   return (
      <div>
         <NavBar />
         <Outlet />
      </div>
   );
};

export default HomeTemplate;
