import toast from 'react-hot-toast';
import {
   loginService,
   logoutService,
   checkExistedEmailService,
   registerService,
} from '../../services/auth-service';
import { checkExistedEmailReducer } from '../reducer/auth-reducer';

export const loginAction = (body, navigate) => {
   return async (dispatch) => {
      try {
         const data = await loginService(body);
         localStorage.setItem(
            import.meta.env.VITE_SIGNED_IN_USER,
            JSON.stringify(data.data)
         );
         setTimeout(() => {
            navigate('/');
         }, 700);
      } catch (error) {
         console.log(error);
      }
   };
};

export const registerAction = (body, navigate) => {
   return async () => {
      try {
         await registerService(body);
         setTimeout(() => {
            navigate('/login');
         }, 700);
      } catch (error) {
         console.log(error);
      }
   };
};

export const logoutAction = (id, navigate) => {
   return async (dispatch) => {
      try {
         await logoutService(id);
         localStorage.removeItem(import.meta.env.VITE_SIGNED_IN_USER);
         setTimeout(() => {
            navigate('/login');
         }, 500);
      } catch (error) {
         console.log(error);
      }
   };
};

export const checkExistedEmailAction = (email) => {
   return async (dispatch) => {
      toast.loading('Checking email', { duration: 500 });
      try {
         if (email.match('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,50}$')) {
            let data = await checkExistedEmailService(email);
            dispatch(
               checkExistedEmailReducer({
                  valid: data.data,
                  message: data.message,
               })
            );
         } else {
            dispatch(
               checkExistedEmailReducer({
                  valid: false,
                  message: 'Invalid email',
               })
            );
         }
      } catch (error) {
         console.log(error);
      }
   };
};
