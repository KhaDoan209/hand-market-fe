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
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const cookies = cookie.parse(document.cookie);
   const signedInUser = getUserFromLocal();

   // useEffect(() => {
   //    if (typeof cookies.access_token == 'undefined' && signedInUser) {
   //       dispatch(resetTokenAction());
   //    } else if (cookies.refresh_token == undefined && signedInUser !== null) {
   //       toast.error('Your session has expired, please login again');
   //       navigate('/login');
   //    }
   // }, []);
   // useEffect(() => {
   //    if (signedInUser?.id) {
   //       socket.emit(SocketMessage.JoinRoom, {
   //          userId: signedInUser?.id,
   //          role: signedInUser?.role,
   //       });
   //       socket.on(SocketMessage.NewNotification, (data) => {
   //          playNotificationSound();
   //          dispatch(getListNotificationAction(signedInUser?.id));
   //       });
   //       socket.on(SocketMessage.ReadNoti, () => {
   //          console.log('read_noti');
   //          dispatch(getListNotificationAction(signedInUser?.id));
   //       });
   //    }
   // }, []);
   // useEffect(() => {
   //    if (signedInUser?.role === Shipper) {
   //       socket.on(SocketMessage.NewOrder, (data) => {
   //          console.log(data);
   //       });
   //       socket.on(SocketMessage.NewFreepick, () => {
   //          dispatch(getListPendingDeliveryOrderAction());
   //       });
   //       socket.on(SocketMessage.UpdateFreepick, () => {
   //          dispatch(getListPendingDeliveryOrderAction());
   //       });
   //       socket.on(SocketMessage.UpdateOrderInProgress, () => {
   //          dispatch(getOrderInProgressAction(signedInUser?.id));
   //       });
   //       socket.on(SocketMessage.UpdateWaitingDone, () => {
   //          dispatch(getListWaitingDoneOrderAction(signedInUser?.id));
   //       });
   //    }
   // }, []);

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
