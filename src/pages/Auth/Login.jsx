import React, { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import FacebookLogin from 'react-facebook-login';
import googleImage from '../../assets/img/google-icon.png';
import facebook from '../../assets/img/facebook-icon.png';
import {
   loginAction,
   loginWithFacebookAction,
   loginWithGoogleAction,
} from '../../redux/action/auth-action';
import { Link, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import warning from '../../assets/svg/warning.svg';
import { Button } from '@chakra-ui/react';
import jwt from 'jwt-decode';
const Login = (props) => {
   const [showPassword, setShowPassword] = useState(false);
   const { dispatch, navigate } = useOutletContext();
   const [showLoginGoogle, setShowLoginGoogle] = useState(false);
   useEffect(() => {
      google.accounts.id.initialize({
         client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
         callback: responseGoogle,
      });
      google.accounts.id.renderButton(document.getElementById('googleSignIn'), {
         theme: 'outline',
         size: 'large',
         locale: 'en',
         width: '300px',
         text: 'continue_with',
      });
   }, []);

   const responseFacebook = (response) => {
      const { id, name, email, picture } = response;
      const loginFacebookData = {
         app_id: id,
         email,
         first_name: name,
         avatar: picture.data.url,
      };
      dispatch(loginWithFacebookAction(loginFacebookData, navigate));
   };
   const responseGoogle = (res) => {
      const { family_name, given_name, sub, email, picture } = jwt(
         res.credential
      );
      const loginGoogleData = {
         app_id: sub,
         email,
         first_name: given_name,
         last_name: family_name,
         avatar: picture,
      };
      dispatch(loginWithGoogleAction(loginGoogleData, navigate));
      setShowLoginGoogle(false);
   };
   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      validationSchema: Yup.object({
         email: Yup.string().required('Email is empty'),
         password: Yup.string().required('Password is empty'),
      }),
      onSubmit: (values) => {
         dispatch(loginAction(values, navigate));
      },
   });

   return (
      <div className='bg-white w-full relative'>
         <div className='w-8/12 mx-auto flex flex-col justify-center h-screen '>
            <h1 className='font-bold text-color-blue text-6xl text-left mt-2 mb-4'>
               Login
            </h1>
            <span className='mb-6 text-md text-color-gray-1 font-normal'>
               Welcome back, please enter your account's information
            </span>
            <form>
               <div className='mb-3 relative'>
                  <label
                     htmlFor='email'
                     className='block mb-2 text-lg text-color-blue font-bold'
                  >
                     Email
                  </label>
                  <input
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     name='email'
                     type='email'
                     id='email'
                     className='block w-full p-3 my-3 text-gray-800 text-sm  border-gray-200 border-2 rounded-lg focus:border-[#374b73] focus:shadow-md input-focus-shadow outline-noner ring-0 focus:ring-0'
                     placeholder='Enter your email'
                     required
                  />
                  {formik.errors.email ? (
                     <p className='text-red-600 ml-1 text-sm flex'>
                        <img
                           src={warning}
                           className='h-5 w-5 mr-2'
                        />
                        {formik.errors.email}
                     </p>
                  ) : (
                     <></>
                  )}
               </div>
               <div className='mb-6 relative'>
                  <label
                     htmlFor='password'
                     className='block mb-2 text-lg text-color-blue font-bold'
                  >
                     Password
                  </label>
                  <input
                     name='password'
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     type={showPassword ? 'text' : 'password'}
                     id='password'
                     className='block w-full p-3 my-3 text-gray-800 text-sm  border-gray-200 border-2 rounded-lg focus:border-[#374b73] focus:shadow-md input-focus-shadow outline-noner ring-0 focus:ring-0'
                     placeholder='Password'
                     required
                  />
                  {formik.errors.password ? (
                     <p className='text-red-600 ml-1 text-sm flex'>
                        <img
                           src={warning}
                           className='h-5 w-5 mr-2'
                        />
                        {formik.errors.password}
                     </p>
                  ) : (
                     <></>
                  )}
                  {formik.errors.password ? (
                     <></>
                  ) : showPassword ? (
                     <EyeSlashIcon
                        onClick={() => {
                           setShowPassword(!showPassword);
                        }}
                        className='h-6 w-6 text-gray-400 absolute top-[60%] right-2 cursor-pointer'
                     />
                  ) : (
                     <EyeIcon
                        onClick={() => {
                           setShowPassword(!showPassword);
                        }}
                        className='h-6 w-6 text-gray-400 absolute top-[60%] right-2 cursor-pointer'
                     />
                  )}
               </div>
               <button
                  onClick={formik.handleSubmit}
                  type='submit'
                  className='text-white font-bold bg-[#FFB4B4] hover:bg-opacity-90 shadow-md shadow-zinc-200 hover:shadow-zinc-300 duration-200 focus:ring-4 focus:outline-none rounded-lg text-md w-full px-5 py-3 text-center my-2'
               >
                  Đăng nhập
               </button>
               <div className='w-full text-center'>
                  <span className='font-semibold text-[#374b73] text-sm md:text-md lg:text-lg'>
                     Or
                  </span>
               </div>
            </form>
            <button
               onClick={() => {
                  setShowLoginGoogle(!showLoginGoogle);
               }}
               className='font-bold bg-white shadow-md shadow-zinc-300 hover:shadow-zinc-400 duration-200 focus:ring-4 focus:outline-none rounded-lg w-full px-5 py-3 my-2'
            >
               <div className={`flex items-center justify-center `}>
                  <img
                     className='rounded-full w-8 h-8'
                     src={googleImage}
                     alt='image description'
                  />
                  <span className='ml-2 text-[#374b73] text-sm md:text-md lg:text-lg'>
                     Login with Google
                  </span>
               </div>
            </button>
            <div
               className={`overlay z-40 ${
                  showLoginGoogle ? 'block' : 'hidden'
               }`}
            ></div>
            <div
               className={`bg-white shadow-md shadow-gray-400 rounded-lg h-fit w-fit absolute top-[40vh] right-[5vw] sm:right-[10vw]  md:right-[20vw] lg:top-[35vh] lg:right-[35vw] z-50  ${
                  showLoginGoogle
                     ? 'block transform translate-y-[0] transition-all duration-300'
                     : 'block transform translate-y-[-100vh] transition-all duration-300'
               }`}
            >
               <div className={'block w-fit m-4 md:m-16'}>
                  <div className='md:flex'>
                     <div id='googleSignIn'></div>
                     <Button
                        className='mt-5 md:ml-2 w-full md:w-fit md:mt-0'
                        onClick={() => {
                           setShowLoginGoogle(false);
                        }}
                     >
                        Close
                     </Button>
                  </div>
               </div>
            </div>
            <FacebookLogin
               cssClass='font-bold bg-[#1877F2] shadow-md shadow-zinc-400 hover:shadow-zinc-500 duration-200 focus:ring-4 focus:outline-none rounded-lg w-full px-5 py-3 my-2 text-white flex items-center justify-center text-sm md:text-md lg:text-lg'
               appId={import.meta.env.VITE_FACEBOOK_APP_ID}
               autoLoad={false}
               fields='name,email,picture'
               callback={responseFacebook}
               icon={
                  <img
                     className='rounded-full w-7 h-7 mr-4'
                     src={facebook}
                     alt='image description'
                  />
               }
            />
            <div className='w-full flex flex-wrap mt-4 mb-4 justify-center text-sm md:text-md'>
               <h4 className='text-gray-400 font-bold md:text-[#374b73] md:font-normal'>
                  Not have an account ?
               </h4>
               <Link
                  className='ml-2 font-bold text-[#374b73] hover:text-[#ffdeb4] hover:text-opacity-90 ease-in-out duration-300 md:font-semibold no-underline'
                  to='/register'
               >
                  Register now
               </Link>
            </div>
            <div className='w-full text-center text-stone-600 text-[14px]'>
               <Link
                  to='/'
                  className='ml-2 text-color-blue hover:opacity-90 hover:text-gray-600 ease-in-out duration-300 font-semibold hover-underline'
               >
                  Back to home
               </Link>
            </div>
         </div>
      </div>
   );
};

export default Login;
