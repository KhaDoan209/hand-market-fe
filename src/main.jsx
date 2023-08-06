import React from 'react';
import './assets/scss/main.scss';
import './index.css';
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
import ProductManagement from './pages/Admin/Product/ProductManagement';
import ProductDetail from './pages/Admin/Product/ProductDetail';
import AddProduct from './pages/Admin/Product/AddProduct';
import DeletedAccount from './pages/Admin/Account/DeletedAccount';
import ShoppingCart from './pages/User/Cart/ShoppingCart';
import Product from './pages/User/Product/Product';
import OrderReview from './pages/User/Order/OrderReview';
import OrderManagement from './pages/User/Order/OrderManagement';
import UserProductDetail from './pages/User/Product/UserProductDetail';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Chart from 'chart.js/auto';
import UserProfile from './pages/User/Account/UserProfile';
import OrderComplete from './pages/User/Order/OrderComplete';
const queryClient = new QueryClient();

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
                              path='/user/user-profile/:id'
                              element={<UserProfile />}
                              lazy={() =>
                                 import('./pages/User/Account/UserProfile')
                              }
                           />
                           <Route
                              path='/user/shopping-cart/:id'
                              element={<ShoppingCart />}
                              lazy={() =>
                                 import('./pages/User/Cart/ShoppingCart')
                              }
                           />
                           <Route
                              path='/user/view-product'
                              element={<Product />}
                              lazy={() =>
                                 import('./pages/User/Product/Product')
                              }
                           />
                           <Route
                              path='/user/view-product-detail/:id'
                              element={<UserProductDetail />}
                              lazy={() =>
                                 import(
                                    './pages/User/Product/UserProductDetail'
                                 )
                              }
                           />
                           <Route
                              path='/user/review-order/:id'
                              element={<OrderReview />}
                              lazy={() =>
                                 import('./pages/User/Order/OrderReview')
                              }
                           />
                           <Route
                              path='/user/order-management/:id'
                              element={<OrderManagement />}
                              lazy={() =>
                                 import('./pages/User/Order/OrderManagement')
                              }
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
                           <Route
                              path='/admin/product-management'
                              element={<ProductManagement />}
                              lazy={() =>
                                 import(
                                    './pages/Admin/Product/ProductManagement'
                                 )
                              }
                           />
                           <Route
                              path='/admin/product-management/new-product'
                              element={<AddProduct />}
                              lazy={() =>
                                 import('./pages/Admin/Product/AddProduct')
                              }
                           />
                           <Route
                              path='/admin/product-management/product-detail/:id'
                              element={<ProductDetail />}
                              lazy={() =>
                                 import('./pages/Admin/Product/ProductDetail')
                              }
                           />
                        </Route>
                        <Route
                           path='/user/order-complete'
                           element={<OrderComplete />}
                           lazy={() =>
                              import('./pages/User/Order/OrderComplete')
                           }
                        />
                     </Route>
                  </Routes>
               </Provider>
            </PersistGate>
         </QueryClientProvider>
      </BrowserRouter>
   </>
);
