import { http } from './axios-interceptor';

export const createPaymentIntentService = (body, customerPaymentId) => {
   return http.post(
      `/payment/create-payment-intent/${customerPaymentId}`,
      body
   );
};
