import React, { Fragment, useEffect, useState } from 'react';
import { Button, Input, Textarea } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import {
   changeProductImageAction,
   getProductDetailAction,
   updateProductInformationAction,
} from '../../../redux/action/product-action';
import { useSelector } from 'react-redux';
import { calculatePriceAfterDiscount } from '../../../utils/utils-functions';
import star from '../../../assets/svg/rate-star.svg';
import emptyStar from '../../../assets/svg/rate-empty-star.svg';
import moment from 'moment/moment';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { getListDiscountAction } from '../../../redux/action/discount-action';
import * as Yup from 'yup';
import { useFormik } from 'formik';
const ProductDetail = () => {
   const { id } = useParams();
   const { dispatch, navigate } = useOutletContext();
   const [showEdit, setShowEdit] = useState(false);
   const [displayUploadedImage, setDisplayUploadedImage] = useState(null);
   const [imageToUpdate, setImageToUpdate] = useState(null);
   const product_detail = useSelector(
      (state) => state.productReducer.product_detail
   );
   const discount = useSelector((state) => state.discountReducer.list_discount);
   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         name: product_detail?.name,
         description: product_detail?.description,
         price: product_detail?.price,
         discount_id: product_detail?.discount_id,
         quantity: product_detail?.quantity,
      },
      validationSchema: Yup.object({
         name: Yup.string().max(100, 'Product name is too long !'),
         description: Yup.string().max(
            1000,
            'Description should less than 1000 letters !'
         ),
         quantity: Yup.number().min(1, 'Quantity is invalid'),
      }),
      onSubmit: (values) => {
         dispatch(
            updateProductInformationAction(
               {
                  ...values,
                  discount_id: Number(values.discount_id),
               },
               product_detail?.id
            )
         );
      },
   });
   const handleInputChange = (event) => {
      const file = event.target.files[0];
      setImageToUpdate(file);
      setDisplayUploadedImage(URL.createObjectURL(file));
   };
   const changeProductImage = () => {
      const formData = new FormData();
      formData.append('file', imageToUpdate);
      dispatch(changeProductImageAction(formData, product_detail?.id));
      setTimeout(() => {
         setImageToUpdate(null);
      }, 3500);
   };
   useEffect(() => {
      dispatch(getProductDetailAction(id));
      dispatch(getListDiscountAction());
   }, []);
   const renderRate = () => {
      if (product_detail?.stars > 0) {
         const stars = [];
         for (let i = 0; i < product_detail?.stars; i++) {
            stars.push(
               <Fragment key={Math.random()}>
                  <img
                     src={star}
                     className='w-7 h-7 mx-1'
                  />
               </Fragment>
            );
         }
         return stars;
      } else {
         const stars = [];
         for (let i = 0; i < 5; i++) {
            stars.push(
               <Fragment key={Math.random()}>
                  <img
                     src={emptyStar}
                     className='w-7 h-7 mx-1'
                  />
               </Fragment>
            );
         }
         return stars;
      }
   };
   return (
      <div className='w-10/12 mx-auto product-detail-page bg-white mt-10 mb-20 px-10 py-14 rounded-md shadow-lg shadow-gray-300'>
         <div className='grid grid-cols-12'>
            <div className='col-span-5'>
               <div className='w-full h-full border-r border-gray-200 flex flex-col justify-start relative'>
                  {displayUploadedImage !== null ? (
                     <img
                        className='pr-2 h-[400px] object-cover'
                        src={displayUploadedImage}
                     />
                  ) : (
                     <img
                        className='pr-2 h-[400px] w-full object-cover xl:object-contain'
                        src={
                           product_detail?.image
                              ? product_detail?.image
                              : 'image'
                        }
                     />
                  )}
                  {imageToUpdate !== null ? (
                     <div
                        onClick={() => {
                           setDisplayUploadedImage(null);
                        }}
                        className='p-[1px] rounded-md cursor-pointer bg-[#5a6e8c] text-white shadow-sm shadow-gray-400 absolute top-[-25px] right-0 hover:bg-white hover:text-[#5a6e8c] transition-all duration-150'
                     >
                        <XMarkIcon className='w-5 h-5 ' />
                     </div>
                  ) : (
                     <></>
                  )}
                  {imageToUpdate !== null ? (
                     <label
                        onClick={changeProductImage}
                        htmlFor='uploadImage'
                        className='mx-auto text-[#374b73] bg-white py-2 px-3 rounded-md cursor-pointer transition-all duration-200 shadow-md shadow-gray-300 text-sm font-semibold hover:shadow-gray-300 hover:opacity-85 hover:text-white hover:bg-[#374b73] mt-4'
                     >
                        Change Image
                     </label>
                  ) : (
                     <>
                        <label
                           htmlFor='uploadImage'
                           className='mx-auto text-[#374b73] bg-white py-2 px-3 rounded-md cursor-pointer transition-all duration-200 shadow-md shadow-gray-300 text-sm font-semibold hover:shadow-gray-300 hover:opacity-85 hover:text-white hover:bg-[#374b73] mt-4'
                        >
                           Upload Image
                        </label>
                        <input
                           id='uploadImage'
                           type='file'
                           accept='image/*'
                           onChange={handleInputChange}
                           className='hidden'
                        />
                     </>
                  )}
               </div>
            </div>
            <div className='col-span-7 ml-5 relative'>
               <div
                  onClick={() => {
                     setShowEdit(!showEdit);
                  }}
                  className='p-2 cursor-pointer hover:bg-[#374b73] rounded-md hover:text-white transition-all duration-200 absolute right-5 top-3'
               >
                  <PencilSquareIcon className='h-4 w-4 lg:h-5 lg:w-5' />
               </div>
               <div className='bg-white px-5 py-3 rounded-md '>
                  <div className='my-2 flex justify-between items-stretch'>
                     <div className='w-3/5 mx-2'>
                        <h1 className='font-mono font-bold text-gray-500 text-lg'>
                           Name:
                        </h1>
                        {showEdit ? (
                           <Input
                              name='name'
                              onChange={formik.handleChange}
                              className='text-3xl font-bold'
                              size={'xl'}
                              disabled={!showEdit}
                              _focus={{
                                 borderColor: '#374b73',
                              }}
                              variant={'flushed'}
                              defaultValue={formik.values.name}
                           />
                        ) : (
                           <h1 className='text-3xl font-bold text-[#374b73]'>
                              {product_detail?.name}
                           </h1>
                        )}
                        <>
                           <span className='text-red-500 font-semibold ml-1 text-md'>
                              {formik.errors.name}
                           </span>
                        </>
                     </div>

                     <div className='my-2 w-2/5 mx-2'>
                        <h1 className='font-mono font-bold text-gray-500 text-lg'>
                           Rate:
                        </h1>
                        <div className='flex'>{renderRate()}</div>
                     </div>
                  </div>
                  <div className='my-4 mx-2'>
                     <h1 className='font-mono font-bold text-gray-500 text-lg'>
                        Description:
                     </h1>
                     {showEdit ? (
                        <Textarea
                           name='description'
                           onChange={formik.handleChange}
                           rows={8}
                           disabled={!showEdit}
                           defaultValue={formik.values.description}
                        />
                     ) : (
                        <p className='text-md text-[#374b73] text-justify'>
                           {product_detail?.description}
                        </p>
                     )}
                     <>
                        <span className='text-red-500 font-semibold ml-1 text-md'>
                           {formik.errors.description}
                        </span>
                     </>
                  </div>
                  <div className='mx-2'>
                     <h1 className='font-mono font-bold text-gray-500 text-lg'>
                        Brand:
                     </h1>
                     <h1 className='text-2xl font-semibold text-[#374b73] text-justify'>
                        {product_detail?.brand}
                     </h1>
                  </div>
                  <div className='my-10 items-center grid grid-cols-12'>
                     <div className='col-span-12 flex my-2'>
                        <div className='my-2 w-2/4 mx-2'>
                           <h1 className='font-mono font-bold text-gray-500 text-lg'>
                              Category:
                           </h1>
                           <h2 className='text-xl font-semibold text-[#5a6e8c]'>
                              {product_detail?.Category?.name}
                           </h2>
                        </div>
                        <div className='my-2 w-2/4 mx-2'>
                           <h1 className='font-mono font-bold text-gray-500 text-lg'>
                              Type:
                           </h1>
                           <h2 className='text-xl font-semibold text-[#5a6e8c]'>
                              {product_detail?.type}
                           </h2>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className='col-span-12 my-10 h-[1px] bg-gray-100'></div>
            <div className='col-span-12 bg-white px-5 rounded-md '>
               <div className='flex my-2'>
                  <div className='my-2 w-1/4 mx-2'>
                     <h1 className='font-mono font-bold text-gray-500 text-lg'>
                        Price:
                     </h1>
                     {showEdit ? (
                        <Input
                           name='price'
                           onChange={formik.handleChange}
                           size={'lg'}
                           className='border-none'
                           type='number'
                           disabled={!showEdit}
                           _focus={{
                              borderColor: '#374b73',
                           }}
                           variant={'flushed'}
                           defaultValue={formik.values.price}
                        />
                     ) : (
                        <h2 className='text-xl font-semibold text-red-500'>
                           {Number(product_detail?.price).toLocaleString(
                              'vi-VN',
                              {
                                 style: 'currency',
                                 currency: 'VND',
                              }
                           )}
                        </h2>
                     )}
                  </div>
                  <div className='my-2 w-1/4 mx-2'>
                     <h1 className='font-mono font-bold text-gray-500 text-lg'>
                        Discounted Price:
                     </h1>
                     <h2 className='text-xl font-semibold text-green-400'>
                        {calculatePriceAfterDiscount(
                           product_detail?.price,
                           product_detail?.Discount?.percentage
                        )}
                     </h2>
                  </div>
                  <div className='my-2 w-1/4 mx-2'>
                     <h1 className='font-mono font-bold text-gray-500 text-lg'>
                        Discount:
                     </h1>
                     {showEdit ? (
                        <select
                           name='discount_id'
                           onChange={formik.handleChange}
                           className='w-full border rounded-md border-gray-200 hover:border-gray-300 focus:border-[#1C64F2] ring-0 transition-all duration-100'
                           value={formik.values.discount_id}
                        >
                           <option value={product_detail.discount_id}>
                              {product_detail?.Discount.percentage}%
                           </option>
                           {discount.map((item) => {
                              if (item.id !== product_detail?.discount_id) {
                                 return (
                                    <option
                                       key={Math.random()}
                                       value={item?.id}
                                    >
                                       {item?.percentage}%
                                    </option>
                                 );
                              }
                           })}
                        </select>
                     ) : (
                        <h2 className='text-xl font-semibold text-orange-300'>
                           {product_detail?.Discount.percentage} %
                        </h2>
                     )}
                  </div>
                  <div className='my-2 w-1/4 mx-2'>
                     <h1 className='font-mono font-bold text-gray-500 text-lg'>
                        Imported At:
                     </h1>
                     <h2 className='text-lg font-semibold text-black'>
                        {moment(product_detail?.created_at).format('LLL')}
                     </h2>
                  </div>
               </div>
               <div className='flex my-2'>
                  <div className='my-2 w-1/4 mx-2'>
                     <h1 className='font-mono font-bold text-gray-500 text-lg'>
                        Quantity:
                     </h1>
                     {showEdit ? (
                        <Input
                           onChange={formik.handleChange}
                           name='quantity'
                           size={'lg'}
                           className='border-none'
                           type='number'
                           disabled={!showEdit}
                           _focus={{
                              borderColor: '#374b73',
                           }}
                           variant={'flushed'}
                           defaultValue={formik.values.quantity}
                        />
                     ) : (
                        <h2 className='text-xl font-semibold text-black'>
                           {product_detail?.quantity} pcs
                        </h2>
                     )}
                     <>
                        <span className='text-red-500 font-semibold ml-1 text-md'>
                           {formik.errors.quantity}
                        </span>
                     </>
                  </div>
                  <div className='my-2 w-1/4 mx-2'>
                     <h1 className='font-mono font-bold text-gray-500 text-lg'>
                        Status:
                     </h1>
                     <h2
                        className={`text-xl font-semibold ${
                           product_detail?.in_stock
                              ? 'text-green-400'
                              : 'text-red-500'
                        }`}
                     >
                        {product_detail?.in_stock ? 'In stock' : 'Out of stock'}
                     </h2>
                  </div>
                  <div className='my-2 w-1/4 mx-2'>
                     <h1 className='font-mono font-bold text-gray-500 text-lg'>
                        Views:
                     </h1>
                     <h2 className='text-xl font-semibold text-black'>
                        {product_detail?.views}
                     </h2>
                  </div>
                  <div className='my-2 w-1/4 mx-2'>
                     <h1 className='font-mono font-bold text-gray-500 text-lg'>
                        Purchases:
                     </h1>
                     <h2 className='bg-transparent text-xl font-semibold text-black'>
                        {product_detail?.purchase}
                     </h2>
                  </div>
               </div>
               <div className='flex my-2 justify-end items-center'>
                  {showEdit ? (
                     <>
                        <Button
                           variant='outline'
                           className='mx-5'
                           colorScheme='gray'
                           onClick={() => {
                              setShowEdit(false);
                           }}
                        >
                           Cancel
                        </Button>
                        <Button
                           variant='solid'
                           colorScheme='facebook'
                           onClick={() => {
                              formik.handleSubmit();
                              setShowEdit(false);
                           }}
                        >
                           Save
                        </Button>
                     </>
                  ) : (
                     ''
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProductDetail;
