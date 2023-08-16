import React, { Suspense, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import toast, { Toaster } from 'react-hot-toast';
import cookie from 'cookie';
import {
   getUserFromLocal,
   playNotificationSound,
} from './utils/utils-functions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetTokenAction } from './redux/action/auth-action';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { socket } from './socket';
import notificationSound from './assets/audio/noti_sound.mp3';
import { getListNotificationAction } from './redux/action/noti-action';
import { Shipper } from './utils/variables';
import {
   getListPendingDeliveryOrderAction,
   getListWaitingDoneOrderAction,
   getOrderDetailAction,
   getOrderInProgressAction,
} from './redux/action/order-action';
import { SocketMessage } from './enums/SocketMessage';
const LazyOutlet = React.lazy(() =>
   import('react-router-dom').then((module) => ({ default: module.Outlet }))
);
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
function App() {
   const cookies = cookie.parse(document.cookie);

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
                  <audio id='notificationSound'>
                     <source
                        src={notificationSound}
                        type='audio/mpeg'
                     />
                  </audio>
                  <Toaster />
               </Elements>
            </ChakraProvider>
         </Suspense>
      </>
   );
}

export default App;
