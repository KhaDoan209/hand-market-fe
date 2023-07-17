import React, { useEffect, useState, useRef } from 'react';
import { Textarea, FormLabel, Input, Button } from '@chakra-ui/react';
import { useOutletContext } from 'react-router-dom';
import {
   getListCategoryAction,
   getListProductTypesAction,
} from '../../../redux/action/category-action';
import { getListDiscountAction } from '../../../redux/action/discount-action';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import {
   resetTextFormInput,
   convertObjectToFormData,
} from '../../../utils/utils-functions';
import { createNewProductAction } from '../../../redux/action/product-action';
const AddProduct = () => {
   const { dispatch, navigate } = useOutletContext();
   const nameRef = useRef(null);
   const priceRef = useRef(null);
   const descriptionRef = useRef(null);
   const quantityRef = useRef(null);
   const [categoryId, setCategoryId] = useState(undefined);
   const [displayUploadedImage, setDisplayUploadedImage] = useState(null);
   const category = useSelector((state) => state.categoryReducer.list_category);
   const product_type = useSelector(
      (state) => state.categoryReducer.product_type
   );
   const discount = useSelector((state) => state.discountReducer.list_discount);
   const handleChangeForm = (e) => {
      const { value, name } = e.target;
      return formik.setFieldValue(name, value);
   };
   const handleDrop = (event) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      formik.setFieldValue('file', file);
      setDisplayUploadedImage(URL.createObjectURL(file));
   };
   const handleInputChange = (event) => {
      const file = event.target.files[0];
      formik.setFieldValue('file', file);
      setDisplayUploadedImage(URL.createObjectURL(file));
   };
   const handleDragOver = (event) => {
      event.preventDefault();
   };
   const formik = useFormik({
      initialValues: {
         name: '',
         price: 0,
         description: '',
         quantity: 0,
         brand: 'Hand Market',
         category_id: '0',
         discount_id: 1,
         type: '',
         file: null,
      },
      validationSchema: Yup.object({
         name: Yup.string()
            .required('Product name is empty !')
            .max(100, 'Product name is too long !'),
         brand: Yup.string().max(100, 'Brand is too long !'),
         price: Yup.number()
            .required('Price is empty !')
            .min(1000, 'Price must be greater than 1000')
            .max(9999999.99, 'Price is too high'),
         description: Yup.string().max(
            1000,
            'Description should less than 1000 letters !'
         ),
         quantity: Yup.number()
            .required('Quantity is empty')
            .min(1, 'Quantity is invalid'),
         category_id: Yup.string().notOneOf(['0'], 'Please choose category'),
         type: Yup.string().required('Product type is required !'),
      }),
      onSubmit: (values) => {
         const newProduct = convertObjectToFormData(values);
         dispatch(createNewProductAction(newProduct));
         resetTextFormInput(nameRef, descriptionRef, priceRef, quantityRef);
         setDisplayUploadedImage(null);
         formik.resetForm();
      },
   });
   useEffect(() => {
      dispatch(getListCategoryAction());
      dispatch(getListDiscountAction());
   }, []);

   return (
      <div className='w-9/12 mx-auto product-page h-min-[500px] h-screen justify-center flex flex-col mt-4'>
         <div className='bg-image'></div>
         <div className='overlay'></div>
         <div className='bg-white rounded-lg shadow-lg shadow-[#5a6e8c] px-10 py-10 '>
            <h2 className='text-4xl font-sans text-[#374b73] font-bold mb-8'>
               Create New Product
            </h2>
            <div className='grid grid-cols-12 gap-3'>
               <div className='col-span-8'>
                  <div className='flex mb-4'>
                     <div className='w-full mx-2'>
                        <FormLabel
                           fontSize={'16px'}
                           className='text-gray-500'
                        >
                           Name
                        </FormLabel>
                        <Input
                           ref={nameRef}
                           onBlur={formik.handleBlur}
                           onChange={formik.handleChange}
                           name='name'
                           type='text'
                        />
                        <>
                           <span className='text-red-500 font-semibold ml-1 text-md'>
                              {formik.errors.name}
                           </span>
                        </>
                     </div>
                  </div>
                  <div className='flex mb-4'>
                     <div className='w-3/5 mx-2'>
                        <FormLabel
                           fontSize={'16px'}
                           className='text-gray-500 text-lg'
                        >
                           Brand
                        </FormLabel>
                        <Input
                           onChange={formik.handleChange}
                           name='brand'
                           type='text'
                           defaultValue={'Hand Market'}
                        />
                     </div>
                     <div className='w-2/5 mx-2'>
                        <FormLabel
                           fontSize={'16px'}
                           className='text-gray-500 text-lg'
                        >
                           Price (VND)
                        </FormLabel>
                        <Input
                           onChange={formik.handleChange}
                           type='number'
                           defaultValue={0}
                           min='1000'
                           name='price'
                           ref={priceRef}
                        />
                        <>
                           <span className='text-red-500 font-semibold ml-1 text-md'>
                              {formik.errors.price}
                           </span>
                        </>
                     </div>
                  </div>
                  <div className='flex mb-4'>
                     <div className='mx-2 w-full'>
                        <FormLabel
                           fontSize={'16px'}
                           className='text-gray-500 text-lg '
                        >
                           Description
                        </FormLabel>
                        <Textarea
                           ref={descriptionRef}
                           placeholder='Description'
                           size='sm'
                           name='description'
                           onChange={formik.handleChange}
                        />
                        <>
                           <span className='text-red-500 font-semibold ml-1 text-md'>
                              {formik.errors.description}
                           </span>
                        </>
                     </div>
                  </div>
               </div>
               <div className='col-span-4'>
                  <div className='h-full'>
                     <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        className={`w-full h-[300px] border-gray-400 border-dashed bg-gray-100 rounded-md flex items-center justify-center ${
                           displayUploadedImage ? 'border-none' : 'border-2'
                        }`}
                     >
                        {displayUploadedImage ? (
                           <img
                              src={displayUploadedImage}
                              className='max-w-full max-h-full'
                           />
                        ) : (
                           <label
                              className='cursor-pointer text-center '
                              htmlFor='uploadImage'
                           >
                              <div className='w-25'>
                                 <CloudArrowUpIcon className='h-7 w-7 mx-auto text-[#374b73]' />
                              </div>
                              <span className='font-light text-justify text-sm text-[#374b73] hover:font-semibold transition-all duration-200'>
                                 Click or drag image to upload
                              </span>
                           </label>
                        )}
                        <input
                           id='uploadImage'
                           type='file'
                           accept='image/*'
                           onChange={handleInputChange}
                           className='hidden'
                        />
                     </div>
                     <div className='w-fit mx-auto mt-2'>
                        <button
                           onClick={() => {
                              setDisplayUploadedImage(null);
                           }}
                           className='mx-auto text-[#374b73] bg-white py-2 px-3 rounded-md cursor-pointer transition-all duration-200 shadow-md shadow-gray-300 text-sm font-semibold hover:shadow-gray-300 hover:opacity-85 hover:text-white hover:bg-[#374b73]'
                        >
                           Clear Image
                        </button>
                     </div>
                  </div>
               </div>
               <div className='col-span-12'>
                  <div className='flex mb-4'>
                     <div className='w-1/4 mx-2'>
                        <FormLabel
                           fontSize={'16px'}
                           className='text-gray-500 text-lg'
                        >
                           Category
                        </FormLabel>
                        <select
                           name='category_id'
                           onChange={(e) => {
                              setCategoryId(e.target.value);
                              formik.setFieldValue('type', '');
                              dispatch(
                                 getListProductTypesAction(e.target.value)
                              );
                              handleChangeForm(e);
                           }}
                           value={formik.values.category_id}
                           className='w-full border rounded-md border-gray-200 hover:border-gray-300 focus:border-[#1C64F2] ring-0 transition-all duration-100'
                        >
                           <option
                              default
                              value='null'
                           >
                              Choose a category
                           </option>
                           {category.map((item) => {
                              return (
                                 <option
                                    name={item?.name}
                                    key={Math.random()}
                                    value={item.id}
                                 >
                                    {item?.name}
                                 </option>
                              );
                           })}
                        </select>
                     </div>
                     <div className='w-1/4 mx-2'>
                        <FormLabel
                           fontSize={'16px'}
                           className='text-gray-500 text-lg'
                        >
                           Type
                        </FormLabel>
                        <select
                           disabled={
                              categoryId === undefined || categoryId == 'null'
                                 ? true
                                 : false
                           }
                           className={`w-full border rounded-md border-gray-200 hover:border-gray-300 focus:border-[#1C64F2] ring-0 transition-all duration-100 ${
                              categoryId == undefined || categoryId == 'null'
                                 ? 'cursor-not-allowed'
                                 : 'cursor-pointer'
                           }`}
                           name='type'
                           onChange={(e) => {
                              handleChangeForm(e);
                           }}
                           value={formik.values.type}
                        >
                           <option
                              default
                              value='null'
                           >
                              Choose type
                           </option>
                           {product_type?.types_list.map((item) => {
                              return (
                                 <option
                                    key={Math.random()}
                                    value={item}
                                 >
                                    {item}
                                 </option>
                              );
                           })}
                        </select>
                        <>
                           <span className='text-red-500 font-semibold ml-1 text-md'>
                              {formik.errors.type}
                           </span>
                        </>
                     </div>
                     <div className='w-1/4 mx-2'>
                        <FormLabel
                           fontSize={'16px'}
                           className='text-gray-500 text-lg'
                        >
                           Quantity
                        </FormLabel>
                        <Input
                           onChange={formik.handleChange}
                           type='number'
                           defaultValue={0}
                           min='0'
                           name='quantity'
                           ref={quantityRef}
                        />
                        <>
                           <span className='text-red-500 font-semibold ml-1 text-md'>
                              {formik.errors.quantity}
                           </span>
                        </>
                     </div>
                     <div className='w-1/4 mx-2'>
                        <FormLabel
                           fontSize={'16px'}
                           className='text-gray-500 text-lg'
                        >
                           Discount (%)
                        </FormLabel>
                        <select
                           name='discount_id'
                           onChange={formik.handleChange}
                           value={formik.values.discount_id}
                           className='w-full border rounded-md border-gray-200 hover:border-gray-300 focus:border-[#1C64F2] ring-0 transition-all duration-100'
                        >
                           <option
                              default
                              value={null}
                           >
                              Discount
                           </option>
                           {discount.map((item) => {
                              return (
                                 <option
                                    key={Math.random()}
                                    value={item?.id}
                                 >
                                    {item?.percentage}
                                 </option>
                              );
                           })}
                        </select>
                     </div>
                  </div>
               </div>
               <div className='col-span-12'>
                  <div className='flex justify-end mx-2'>
                     <Button
                        onClick={formik.handleSubmit}
                        colorScheme='facebook'
                     >
                        Add Product
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AddProduct;
