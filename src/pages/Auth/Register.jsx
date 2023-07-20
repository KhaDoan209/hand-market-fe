import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import {
   registerAction,
   checkExistedEmailAction,
} from '../../redux/action/auth-action';
import { Link, useOutletContext } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import google from '../../assets/img/google-icon.png';
import facebook from '../../assets/img/facebook-icon.png';
import warning from '../../assets/svg/warning.svg';
import tick from '../../assets/svg/tick.svg';
import cross from '../../assets/svg/cross.svg';
import { useSelector } from 'react-redux';
const Register = (props) => {
   const [showPassword, setShowPassword] = useState(false);
   const [emailCheck, setEmailCheck] = useState('');
   const debouncedEmailCheck = useDebounce(emailCheck, 500);
   const emailValid = useSelector((state) => state.authReducer?.emailValid);
   const { dispatch, navigate } = useOutletContext();
   const handleCheckEmail = (event) => {
      setEmailCheck(event.target.value);
   };

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
         first_name: '',
         last_name: '',
      },
      validationSchema: Yup.object({
         email: Yup.string()
            .required('Email cannot be empty')
            .email('Email is not valid')
            .max(50, 'Email is too long'),
         password: Yup.string().required('Password cannot be empty'),
         re_password: Yup.string()
            .required('You need to confirm your password')
            .oneOf([Yup.ref('password'), null], 'Password is not matched'),
         first_name: Yup.string()
            .required('First name is required')
            .max(50, 'First name is too long'),
         last_name: Yup.string()
            .required('Last name is required')
            .max(50, 'Last name is too long'),
      }),
      onSubmit: (values) => {
         dispatch(registerAction(values, navigate));
      },
   });
   useEffect(() => {
      dispatch(checkExistedEmailAction(emailCheck));
   }, [debouncedEmailCheck]);

   return (
      <div className='w-full bg-white'>
         <div className='w-8/12 mx-auto flex flex-col justify-center h-[950px] my-auto'>
            <h1 className='font-bold text-color-blue text-6xl text-left mt-2 mb-4'>
               Register
            </h1>
            <span className='mb-3 text-md text-color-gray-1 font-normal'>
               New to us ? Please enter your 's information
            </span>
            <form>
               <div className='mb-2 relative'>
                  <label
                     htmlFor='email'
                     className='block mb-2 text-lg text-color-blue font-bold'
                  >
                     Email
                  </label>
                  <input
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     onKeyUp={handleCheckEmail}
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
                  <div className='w-5 h-5 absolute right-2 top-14 text-white'>
                     {emailCheck.length > 0 ? (
                        <>
                           {emailValid.valid ? (
                              <>
                                 <img
                                    src={tick}
                                    className='w-full z-20'
                                 />
                              </>
                           ) : (
                              <img
                                 src={cross}
                                 className='w-full'
                              />
                           )}
                        </>
                     ) : (
                        <></>
                     )}
                  </div>
               </div>
               <div className='mb-2 relative'>
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
                     id='text'
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
               <div className='mb-2'>
                  <label
                     htmlFor='re_password'
                     className='block mb-2 text-lg text-color-blue font-bold'
                  >
                     Re-enter your password
                  </label>
                  <input
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     name='re_password'
                     type='password'
                     id='re_password'
                     className='block w-full p-3 my-3 text-gray-800 text-sm  border-gray-200 border-2 rounded-lg focus:border-[#374b73] focus:shadow-md input-focus-shadow outline-noner ring-0 focus:ring-0'
                     placeholder='Re-enter your password'
                  />
                  {formik.errors.re_password ? (
                     <p className='text-red-600 ml-1 text-sm flex'>
                        <img
                           src={warning}
                           className='h-5 w-5 mr-2'
                        />
                        {formik.errors.re_password}
                     </p>
                  ) : (
                     <></>
                  )}
               </div>
               <div className='flex'>
                  <div className='w-2/4 mr-1'>
                     <div className='mb-2'>
                        <label
                           htmlFor='first_name'
                           className='block mb-2 text-lg text-color-blue font-bold'
                        >
                           First Name
                        </label>
                        <input
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           name='first_name'
                           type='text'
                           id='first_name'
                           className='block w-full p-3 my-3 text-gray-800 text-sm  border-gray-200 border-2 rounded-lg focus:border-[#374b73] focus:shadow-md input-focus-shadow outline-noner ring-0 focus:ring-0'
                           placeholder='First name'
                        />
                        {formik.errors.first_name ? (
                           <p className='text-red-600 ml-1 text-sm flex'>
                              <img
                                 src={warning}
                                 className='h-5 w-5 mr-2'
                              />
                              {formik.errors.first_name}
                           </p>
                        ) : (
                           <></>
                        )}
                     </div>
                  </div>
                  <div className='w-2/4 ml-1'>
                     <div className='mb-2'>
                        <label
                           htmlFor='last_name'
                           className='block mb-2 text-lg text-color-blue font-bold'
                        >
                           Last Name
                        </label>
                        <input
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           name='last_name'
                           type='text'
                           id='last_name'
                           className='block w-full p-3 my-3 text-gray-800 text-sm  border-gray-200 border-2 rounded-lg focus:border-[#374b73] focus:shadow-md input-focus-shadow outline-noner ring-0 focus:ring-0'
                           placeholder='Last name'
                        />
                        {formik.errors.last_name ? (
                           <p className='text-red-600 ml-1 text-sm flex'>
                              <img
                                 src={warning}
                                 className='h-5 w-5 mr-2'
                              />
                              {formik.errors.last_name}
                           </p>
                        ) : (
                           <></>
                        )}
                     </div>
                  </div>
               </div>
               <button
                  onClick={formik.handleSubmit}
                  type='submit'
                  className='text-white font-bold bg-[#FFB4B4] hover:bg-opacity-90 hover:shadow-lg hover:shadow-zinc-200 duration-200 focus:ring-4 focus:outline-none rounded-lg text-md w-full px-5 py-3 text-center my-2'
               >
                  Register
               </button>
               <div className='w-full text-center'>
                  <span className='font-semibold text-[#374b73] text-sm md:text-md lg:text-lg'>
                     Or
                  </span>
               </div>
               <button
                  type='submit'
                  className='font-bold bg-white hover:bg-opacity-90 shadow-md shadow-zinc-200 hover:shadow-lg hover:shadow-zinc-200 duration-200 focus:ring-4 focus:outline-none rounded-lg w-full px-5 py-3 my-2'
               >
                  <div className='flex items-center justify-center'>
                     <img
                        className='rounded-full w-8 h-8'
                        src={google}
                        alt='image description'
                     />
                     <span className='ml-2 text-[#374b73] text-sm md:text-md lg:text-lg'>
                        Log in with Google
                     </span>
                  </div>
               </button>
               <button
                  type='submit'
                  className='font-bold bg-[#1877F2] hover:bg-opacity-90 shadow-md shadow-zinc-200 hover:shadow-lg hover:shadow-zinc-200 duration-200 focus:ring-4 focus:outline-none rounded-lg w-full px-5 py-3 my-2'
               >
                  <div className='flex items-center justify-center '>
                     <img
                        className='rounded-full w-8 h-8'
                        src={facebook}
                        alt='image description'
                     />
                     <span className='ml-2 text-sm md:text-md lg:text-lg text-white'>
                        Log in with Facebook
                     </span>
                  </div>
               </button>
            </form>

            <div className='w-full flex flex-wrap mt-4 mb-3 justify-center text-sm md:text-md'>
               <h4 className='text-white font-bold md:text-[#374b73] md:font-normal'>
                  Already have an account ?
               </h4>
               <Link
                  className='ml-2 font-bold text-[#374b73] hover:text-[#ffdeb4] hover:text-opacity-90 ease-in-out duration-300 md:font-semibold no-underline'
                  to='/login'
               >
                  To login
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

export default Register;
