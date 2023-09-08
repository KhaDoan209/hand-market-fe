import React from 'react';
import './assets/scss/main.scss';
import './index.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'chartjs-adapter-moment';
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
import OrderDetailAdmin from './pages/Admin/Order/OrderDetailAdmin';
import MessageShipper from './pages/Shipper/Message/MessageShipper';
import Statistic from './pages/Admin/Statistic/Statistic';
import Message from './pages/User/Message/Message';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Chart from 'chart.js/auto';
import OrderManagementAdmin from './pages/Admin/Order/OrderManagementAdmin';

ReactDOM.createRoot(document.getElementById('root')).render(
   <>
      <BrowserRouter>
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
                           lazy={() => import('./pages/User/Cart/ShoppingCart')}
                        />
                        <Route
                           path='/user/view-product'
                           element={<Product />}
                           lazy={() => import('./pages/User/Product/Product')}
                        />
                        <Route
                           path='/user/view-product-detail/:id'
                           element={<UserProductDetail />}
                           lazy={() =>
                              import('./pages/User/Product/UserProductDetail')
                           }
                        />
                        <Route
                           path='/user/review-order/:id'
                           element={<OrderReview />}
                           lazy={() => import('./pages/User/Order/OrderReview')}
                        />
                        <Route
                           path='/user/order-management/:id'
                           element={<OrderManagement />}
                           lazy={() =>
                              import('./pages/User/Order/OrderManagement')
                           }
                        />
                        <Route
                           path='/user/order-detail/:id'
                           element={<OrderDetailUser />}
                           lazy={() =>
                              import('./pages/User/Order/OrderDetailUser')
                           }
                        />
                        <Route
                           path='/user/message/:id'
                           element={<Message />}
                           lazy={() => import('./pages/User/Message/Message')}
                        />
                        <Route
                           path='/shipper/notification/:id'
                           element={<Notification />}
                           lazy={() =>
                              import(
                                 './pages/Shipper/Notification/Notification'
                              )
                           }
                        />
                        <Route
                           path='/shipper/order-list/:id'
                           element={<OrderList />}
                           lazy={() =>
                              import('./pages/Shipper/Order/OrderList')
                           }
                        />
                        <Route
                           path='/shipper/message/:id'
                           element={<Message />}
                           lazy={() => import('./pages/User/Message/Message')}
                        />
                        <Route
                           path='/shipper/message-detail/:id'
                           element={<MessageShipper />}
                           lazy={() =>
                              import('./pages/Shipper/Message/MessageShipper')
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
                           lazy={() =>
                              import('./pages/Admin/Account/AccountManagement')
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
                              import('./pages/Admin/Product/ProductManagement')
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
                        <Route
                           path='/admin/order-management'
                           element={<OrderManagementAdmin />}
                           lazy={() =>
                              import('./pages/Admin/Order/OrderManagementAdmin')
                           }
                        />
                        <Route
                           path='/admin/statistic'
                           element={<Statistic />}
                           lazy={() =>
                              import('./pages/Admin/Statistic/Statistic')
                           }
                        />
                        <Route
                           path='/admin/order-management/order-detail/:id'
                           element={<OrderDetailAdmin />}
                           lazy={() =>
                              import('./pages/Admin/Order/OrderDetailAdmin')
                           }
                        />
                     </Route>
                     <Route
                        path='/user/order-complete'
                        element={<OrderComplete />}
                        lazy={() => import('./pages/User/Order/OrderComplete')}
                     />
                  </Route>
               </Routes>
            </Provider>
         </PersistGate>
      </BrowserRouter>
   </>
);
