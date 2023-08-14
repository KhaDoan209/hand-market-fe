import React from 'react';
import './assets/scss/main.scss';
import './index.css';
import 'mapbox-gl/dist/mapbox-gl.css';
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
import Notification from './pages/Shipper/Notification/Notification';
import OrderList from './pages/Shipper/Order/OrderList';
import UserProfile from './pages/User/Account/UserProfile';
import OrderComplete from './pages/User/Order/OrderComplete';
import OrderDetailUser from './pages/User/Order/OrderDetailUser';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Chart from 'chart.js/auto';

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
                           />
                           <Route
                              path='/user/shopping-cart/:id'
                              element={<ShoppingCart />}
                           />
                           <Route
                              path='/user/view-product'
                              element={<Product />}
                           />
                           <Route
                              path='/user/view-product-detail/:id'
                              element={<UserProductDetail />}
                           />
                           <Route
                              path='/user/review-order/:id'
                              element={<OrderReview />}
                           />
                           <Route
                              path='/user/order-management/:id'
                              element={<OrderManagement />}
                           />
                           <Route
                              path='/user/order-detail/:id'
                              element={<OrderDetailUser />}
                           />
                           <Route
                              path='/shipper/notification/:id'
                              element={<Notification />}
                           />
                           <Route
                              path='/shipper/order-list/:id'
                              element={<OrderList />}
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
                           <Route
                              path='/register'
                              element={<Register />}
                           />
                        </Route>
                        <Route element={<AdminTemplate />}>
                           <Route
                              path='/admin/account-management'
                              element={<AccountManagement />}
                           />
                           <Route
                              path='/admin/account-management/view-detail/:id'
                              element={<AccountDetail />}
                           />
                           <Route
                              path='/admin/account-management/deleted-account'
                              element={<DeletedAccount />}
                           />
                           <Route
                              path='/admin/product-management'
                              element={<ProductManagement />}
                           />
                           <Route
                              path='/admin/product-management/new-product'
                              element={<AddProduct />}
                           />
                           <Route
                              path='/admin/product-management/product-detail/:id'
                              element={<ProductDetail />}
                           />
                        </Route>
                        <Route
                           path='/user/order-complete'
                           element={<OrderComplete />}
                        />
                     </Route>
                  </Routes>
               </Provider>
            </PersistGate>
         </QueryClientProvider>
      </BrowserRouter>
   </>
);
