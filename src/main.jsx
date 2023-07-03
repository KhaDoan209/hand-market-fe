import React from 'react';
import './assets/scss/main.scss';
import './index.css';
import './assets/scss/main.scss';
import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeTemplate from './layouts/HomeTemplate';
import FormTemplate from './layouts/FormTemplate';
import AdminTemplate from './layouts/AdminTemplate';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AccountManagement from './pages/Admin/Account/AccountManagement';
import AccountDetail from './pages/Admin/Account/AccountDetail';
import DeletedAccount from './pages/Admin/Account/DeletedAccount';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { getUserFromLocal } from './utils/utils-functions';
import Chart from 'chart.js/auto';
const queryClient = new QueryClient();
const checkAuthentication = () => {
   const userRole = getUserFromLocal();
   if (userRole) {
      return true;
   }
   return false;
};

ReactDOM.createRoot(document.getElementById('root')).render(
   <>
      <BrowserRouter basename='hand-market'>
         <QueryClientProvider client={queryClient}>
            <PersistGate
               loading={null}
               persistor={persistor}
            >
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
                              lazy={() => import('./pages/Auth/Login')}
                           />
                           <Route
                              path='/register'
                              element={<Register />}
                              lazy={() => import('./pages/Auth/Register')}
                           />
                        </Route>
                        <Route element={<AdminTemplate />}>
                           <Route
                              path='/admin/account-management'
                              element={<AccountManagement />}
                              lazy={() =>
                                 import(
                                    './pages/Admin/Account/AccountManagement'
                                 )
                              }
                           />
                           <Route
                              path='/admin/account-management/view-detail/:id'
                              element={<AccountDetail />}
                              lazy={() =>
                                 import('./pages/Admin/Account/AccountDetail')
                              }
                           />
                           <Route
                              path='/admin/account-management/deleted-account'
                              element={<DeletedAccount />}
                              lazy={() =>
                                 import('./pages/Admin/Account/DeletedAccount')
                              }
                           />
                        </Route>
                     </Route>
                  </Routes>
               </Provider>
            </PersistGate>
         </QueryClientProvider>
      </BrowserRouter>
   </>
);
