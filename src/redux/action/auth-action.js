import { data } from 'autoprefixer';
import { loginService } from '../../services/auth-service';
import { loginReducer } from '../reducer/auth-reducer';
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
