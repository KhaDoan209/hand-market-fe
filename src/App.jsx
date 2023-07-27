import React, { Suspense, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import toast, { Toaster } from 'react-hot-toast';
import cookie from 'cookie';
import { getUserFromLocal } from './utils/utils-functions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetTokenAction } from './redux/action/auth-action';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const LazyOutlet = React.lazy(() =>
   import('react-router-dom').then((module) => ({ default: module.Outlet }))
);
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
function App() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const cookies = cookie.parse(document.cookie);
   const signedInUser = getUserFromLocal();

   useEffect(() => {
      if (typeof cookies.access_token == 'undefined' && signedInUser) {
         dispatch(resetTokenAction());
      } else if (cookies.refresh_token == undefined && signedInUser !== null) {
         toast.error('Your session has expired, please login again');
         navigate('/login');
      }
   }, []);
   return (
      <>
         <Suspense fallback={<div>Loading...</div>}>
            <ChakraProvider>
               <Elements
                  stripe={stripePromise}
                  options={{
                     appearance: {
                        theme: 'stripe',
                     },
                  }}
               >
                  <LazyOutlet />
                  <Toaster />
               </Elements>
            </ChakraProvider>
         </Suspense>
      </>
   );
}

export default App;
