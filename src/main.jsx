import React from 'react';
import './index.css';
import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeTemplate from './layouts/HomeTemplate';
import Home from './pages/Home';
import Login from './pages/Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
   <>
      <BrowserRouter basename='hand-market'>
         <QueryClientProvider client={queryClient}>
            <Routes>
               <Route
                  path='/'
                  element={<App />}
               >
                  <Route element={<HomeTemplate />}>
                     <Route
                        index
                        path='/'
                        element={<Home />}
                     />
                     <Route
                        path='/login'
                        element={<Login />}
                        lazy={() => import('./pages/Login')}
                     />
                     <Route
                        path='/*'
                        element={<Navigate to={'/'} />}
                     />
                  </Route>
               </Route>
            </Routes>
         </QueryClientProvider>
      </BrowserRouter>
   </>
);
