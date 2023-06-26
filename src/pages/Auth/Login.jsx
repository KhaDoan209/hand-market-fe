import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { loginAction } from '../../redux/action/auth-action';
import { Link, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import warning from '../../assets/svg/warning.svg';
const Login = (props) => {
   const [showPassword, setShowPassword] = useState(false);
   const { dispatch, navigate } = useOutletContext();
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
      <div className='w-8/12 mx-auto flex flex-col justify-center h-screen'>
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
               className='text-white font-bold bg-[#FFB4B4] hover:bg-opacity-90 hover:shadow-lg hover:shadow-zinc-200 duration-200 focus:ring-4 focus:outline-none rounded-lg text-md w-full px-5 py-3 text-center my-2'
            >
               Đăng nhập
            </button>
         </form>

         <div className='w-full flex flex-wrap mt-4 mb-4 justify-center text-sm md:text-md'>
            <h4 className='text-white font-bold md:text-[#374b73] md:font-normal'>
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
   );
};

export default Login;
