import React, { useState, useEffect } from 'react';
import {
   PaymentElement,
   LinkAuthenticationElement,
   useStripe,
   useElements,
   CardElement,
} from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
const PaymentForm = () => {
   const stripe = useStripe();
   const elements = useElements();
   const signedInUser = useSelector(
      (state) => state.authReducer.user_signed_in
   );
   const [message, setMessage] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   useEffect(() => {
      if (!stripe) {
         return;
      }
      const clientSecret = new URLSearchParams(window.location.search).get(
         'payment_intent_client_secret'
      );
      if (!clientSecret) {
         return;
      }
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
         switch (paymentIntent.status) {
            case 'succeeded':
               setMessage('Payment succeeded!');
               break;
            case 'processing':
               setMessage('Your payment is processing.');
               break;
            case 'requires_payment_method':
               setMessage('Your payment was not successful, please try again.');
               break;
            default:
               setMessage('Something went wrong.');
               break;
         }
      });
   }, [stripe]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!stripe || !elements) {
         return;
      }
      setIsLoading(true);
      const { error } = await stripe.confirmPayment({
         elements,
         confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: 'http://localhost:3000',
         },
      });
      if (error.type === 'card_error' || error.type === 'validation_error') {
         setMessage(error.message);
      } else {
         setMessage('An unexpected error occurred.');
      }
      setIsLoading(false);
   };

   return (
      <form
         className='w-full'
         id='payment-form'
         onSubmit={handleSubmit}
      >
         <PaymentElement
            id='payment-element'
            options={{
               layout: 'tabs',
               defaultValues: {
                  billingDetails: {
                     email: signedInUser?.email || '',
                     name:
                        signedInUser?.last_name + signedInUser?.first_name ||
                        '',
                     phone: signedInUser?.phone || '',
                  },
               },
            }}
         />
         <div className='flex justify-end'>
            <button
               className='bg-[#374b73] px-3 py-2 rounded-md text-white mt-5'
               disabled={isLoading || !stripe || !elements}
               id='submit'
            >
               <span id='button-text'>
                  {isLoading ? (
                     <div
                        className='spinner'
                        id='spinner'
                     ></div>
                  ) : (
                     'Pay now'
                  )}
               </span>
            </button>
         </div>
         {message && <div id='payment-message'>{toast.error(message)}</div>}
      </form>
   );
};

export default PaymentForm;

// const handleSubmit = async (event) => {
//    event.preventDefault();
//    const amountToCharge = 1000000;
//    const cardElement = elements?.getElement(CardElement);
//    if (!stripe || !elements || !cardElement) {
//       return;
//    }
//    const stripeResponse = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//    });

//    const { error, paymentMethod } = stripeResponse;
//    if (error || !paymentMethod) {
//       return;
//    }
//    const paymentMethodId = paymentMethod.id;
//    fetch(
//       `http://localhost:8080/hand-market-api/payment/create-payment-intent/cus_OJACupYIuqEFgK`,
//       {
//          method: 'POST',
//          body: JSON.stringify({
//             paymentMethodId,
//             amount: amountToCharge,
//          }),
//          credentials: 'include',
//          headers: {
//             'Content-Type': 'application/json',
//          },
//       }
//    );
// };
