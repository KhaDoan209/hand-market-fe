import React from 'react';
import './assets/scss/main.scss';
import './index.css';
import './assets/scss/main.scss';
import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeTemplate from './layouts/HomeTemplate';
import FormTemplate from './layouts/FormTemplate';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/lib/integration/react';
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
                     </Route>
                  </Routes>
               </Provider>
            </PersistGate>
         </QueryClientProvider>
      </BrowserRouter>
   </>
);
