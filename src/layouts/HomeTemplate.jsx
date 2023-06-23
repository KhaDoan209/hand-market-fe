import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useDispatch } from 'react-redux';
const HomeTemplate = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   return (
      <>
         <NavBar />
         <Outlet context={({ navigate, dispatch })} />
      </>
   );
};

export default HomeTemplate;
