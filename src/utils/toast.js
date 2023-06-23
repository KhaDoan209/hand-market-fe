import { toast } from 'react-hot-toast';

export const toastPromise = (
   method,
   loading,
   success,
   error = 'Unexpected error',
   duration = 1000
) => {
   return toast.promise(
      method,
      {
         loading,
         success,
         error,
      },
      {
         style: {
            minWidth: '250px',
         },
         success: {
            duration,
         },
         loading: {
            duration,
         },
         error: {
            duration,
         },
      }
   );
};
