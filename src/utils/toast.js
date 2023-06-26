import { toast } from 'react-hot-toast';

export const toastPromise = (
   method,
   loading,
   duration = 1000
) => {
   return toast.promise(
      method,
      {
         loading,
         success: (mess) => `${mess.message.toString()}`,
         error: (err) => `${err.message.toString()}`,
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
