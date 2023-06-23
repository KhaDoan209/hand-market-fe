import React from 'react';
import './index.css';
import './assets/scss/main.scss';
import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeTemplate from './layouts/HomeTemplate';
import FormTemplate from './layouts/FormTemplate';
import Home from './pages/Home';
import Login from './pages/Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './redux/store';
import { Provider } from 'react-redux';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
   <>
      <BrowserRouter basename='hand-market'>
         <QueryClientProvider client={queryClient}>
            <Provider store={store}>
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
                           path='/*'
                           element={<Navigate to={'/'} />}
                        />
                     </Route>
                     <Route element={<FormTemplate />}>
                        <Route
                           path='/login'
                           element={<Login />}
                        />
                     </Route>
                  </Route>
               </Routes>
            </Provider>
         </QueryClientProvider>
      </BrowserRouter>
   </>
);
