import React, { useState, useEffect } from 'react';
import {
   CameraIcon,
   CreditCardIcon,
   EllipsisHorizontalIcon,
   PhoneIcon,
} from '@heroicons/react/20/solid';
import { toast } from 'react-hot-toast';
import { useParams, useOutletContext } from 'react-router-dom';
import {
   changePasswordAction,
   getUserDetailAction,
   updateUserAddressAction,
   updateUserInformationAction,
   uploadUserAvatarAction,
} from '../../../redux/action/user-action';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
   Select,
   Input,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   useDisclosure,
   Button,
} from '@chakra-ui/react';
import NextArrow from '../../../components/NextArrow';
import PrevArrow from '../../../components/PrevArrow';
import alterAvatar from '../../../assets/img/alter-ava.png';
import { MapPinIcon } from '@heroicons/react/24/solid';
import PaymentCard from '../../../components/PaymentCard';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
   createNewCardAction,
   getListSavedCardAction,
} from '../../../redux/action/card-action';
import Slider from 'react-slick';
const UserProfile = () => {
   const { dispatch, navigate } = useOutletContext();
   const { id } = useParams();
   const [openProfileSetting, setOpenProfileSetting] = useState(false);
   const [enableInput, setEnableInput] = useState(false);
   const [enablePhone, setEnablePhone] = useState(false);
   const [uploadImg, setUploadImg] = useState(null);
   const [selectedImage, setSelectedImg] = useState(null);
   const stripe = useStripe();
   const elements = useElements();
   const userDetail = useSelector((state) => state.authReducer?.user_signed_in);
   const listSavedCards = useSelector((state) => state.cardReducer?.list_card);
   const CARD_ELEMENT_OPTIONS = {
      style: {
         base: {
            color: '#374b73',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
               color: '#aab7c4',
            },
         },
         invalid: {
            color: '#EF4444',
            iconColor: '#EF4444',
         },
      },
   };
   const actionList = [
      {
         label: 'Edit Address',
         action: () => {
            setOpenProfileSetting(!openProfileSetting);
            {
               enableInput == true
                  ? setEnableInput(false)
                  : setEnableInput(true);
            }
         },
      },
      {
         label: 'Edit Phone',
         action: () => {
            setOpenProfileSetting(!openProfileSetting);
            {
               enablePhone == true
                  ? setEnablePhone(false)
                  : setEnablePhone(true);
            }
         },
      },
      {
         label: 'Edit Name',
         action: () => {
            setOpenProfileSetting(!openProfileSetting);
            onOpenUpdateName();
         },
      },
      {
         label: 'Change password',
         action: () => {
            setOpenProfileSetting(!openProfileSetting);
            onOpenChangePassword();
         },
      },
   ];
   const {
      isOpen: isOpenChangePassword,
      onOpen: onOpenChangePassword,
      onClose: onCloseChangePassword,
   } = useDisclosure();
   const {
      isOpen: isOpenUpdateInfor,
      onOpen: onOpenUpdateInfor,
      onClose: onCloseUpdateInfor,
   } = useDisclosure();
   const {
      isOpen: isOpenUpdateName,
      onOpen: onOpenUpdateName,
      onClose: onCloseUpdateName,
   } = useDisclosure();
   const {
      isOpen: isOpenUpdateCard,
      onOpen: onOpenUpdateCard,
      onClose: onCloseUpdateCard,
   } = useDisclosure();
   const {
      isOpen: isOpenChangeAvatar,
      onOpen: onOpenChangeAvatar,
      onClose: onCloseChangeAvatar,
   } = useDisclosure();
   useEffect(() => {
      dispatch(getListSavedCardAction(userDetail?.stripe_customer_id));
      dispatch(getUserDetailAction(userDetail?.id));
   }, []);
   const formikAddress = useFormik({
      enableReinitialize: true,
      initialValues: {
         street: userDetail?.Address?.street,
         province: userDetail?.Address?.province,
         district: userDetail?.Address?.district,
         ward: userDetail?.Address?.ward,
      },
      validationSchema: Yup.object({
         street: Yup.string().max(100, 'Street is too long'),
         province: Yup.string().max(100, 'Province is too long'),
         district: Yup.string().max(100, 'District is too long'),
         ward: Yup.string().max(100, 'Ward is too long'),
      }),
      onSubmit: (values) => {
         dispatch(updateUserAddressAction(userDetail?.id, values));
      },
   });
   const formikPassword = useFormik({
      initialValues: {
         password: '',
      },
      validationSchema: Yup.object({
         password: Yup.string().required("Password can't be empty"),
      }),
      onSubmit: (values) => {
         dispatch(changePasswordAction(userDetail?.id, values));
      },
   });
   const formikInfor = useFormik({
      enableReinitialize: true,
      initialValues: {
         phone: userDetail?.phone,
         first_name: userDetail?.first_name,
         last_name: userDetail?.last_name,
         is_locked: userDetail?.is_locked,
      },
      validationSchema: Yup.object({
         phone: Yup.string().max(15, 'Phone number is invalid'),
      }),
      onSubmit: (values) => {
         dispatch(updateUserInformationAction(values, userDetail?.id));
      },
   });
   const renderModalChangePassword = () => {
      return (
         <>
            <Modal
               size='lg'
               isCentered
               isOpen={isOpenChangePassword}
               onClose={onCloseChangePassword}
            >
               <ModalOverlay />
               <ModalContent>
                  <ModalHeader>
                     <span className='text-xl'>
                        {`Enter new password ${userDetail?.email}`}
                     </span>
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                     <Input
                        name='password'
                        onChange={formikPassword.handleChange}
                        _focus={{
                           borderColor: '#374b73',
                        }}
                        placeholder='New password'
                     />
                     {formikPassword.errors.password ? (
                        <>
                           <span className='text-red-500 font-semibold ml-1 text-[14px]'>
                              {formikPassword.errors.password}
                           </span>
                        </>
                     ) : (
                        <></>
                     )}
                  </ModalBody>
                  <ModalFooter>
                     <Button
                        ariant='ghost'
                        colorScheme='gray'
                        mr={3}
                        onClick={onCloseChangePassword}
                     >
                        <span className='text-[#374b73]'>Close</span>
                     </Button>
                     <Button
                        onClick={() => {
                           onCloseChangePassword();
                           formikPassword.handleSubmit();
                           toast.loading('Wait a sec !', { duration: 300 });
                        }}
                        colorScheme='whatsapp'
                     >
                        Change
                     </Button>
                  </ModalFooter>
               </ModalContent>
            </Modal>
         </>
      );
   };
   const renderModalUpdateAddress = () => {
      return (
         <>
            <Modal
               size='xl'
               isCentered
               isOpen={isOpenUpdateInfor}
               onClose={onCloseUpdateInfor}
            >
               <ModalOverlay />
               <ModalContent>
                  <ModalHeader>
                     <span className='text-2xl'>
                        {`Do you want to update your's address ?`}
                     </span>
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalFooter>
                     <Button
                        ariant='ghost'
                        colorScheme='gray'
                        mr={3}
                        onClick={() => {
                           onCloseUpdateInfor();
                           setEnableInput(false);
                        }}
                     >
                        <span className='text-[#374b73]'>Close</span>
                     </Button>
                     <Button
                        onClick={() => {
                           setEnableInput(false);
                           setOpenProfileSetting(false);
                           onCloseUpdateInfor();
                           formikAddress.handleSubmit();
                        }}
                        colorScheme='whatsapp'
                     >
                        Update
                     </Button>
                  </ModalFooter>
               </ModalContent>
            </Modal>
         </>
      );
   };
   const renderModalUpdateName = () => {
      return (
         <>
            <Modal
               size='xl'
               isCentered
               isOpen={isOpenUpdateName}
               onClose={onCloseUpdateName}
            >
               <ModalOverlay />
               <ModalContent>
                  <ModalHeader className='w-10/12 mx-auto'>
                     <span className='text-xl lg:text-3xl'>
                        {`Update your name and email`}
                     </span>
                  </ModalHeader>
                  <ModalBody className='w-10/12 mx-auto'>
                     <div className='my-2'>
                        <label
                           className='text-sm lg:text-lg font-semibold lg:pr-3 text-gray-600'
                           htmlFor='first_name'
                        >
                           First Name
                        </label>
                        <Input
                           id='first_name'
                           onChange={formikInfor.handleChange}
                           name='first_name'
                           _focus={{
                              borderColor: '#374b73',
                           }}
                           variant='flushed'
                           placeholder={userDetail?.first_name}
                        />
                     </div>
                     <div className='my-2'>
                        <label
                           className='text-sm lg:text-lg font-semibold lg:pr-3 text-gray-600'
                           htmlFor='first_name'
                        >
                           Last Name
                        </label>
                        <Input
                           id='last_name'
                           onChange={formikInfor.handleChange}
                           name='last_name'
                           _focus={{
                              borderColor: '#374b73',
                           }}
                           variant='flushed'
                           placeholder={userDetail?.last_name}
                        />
                     </div>
                  </ModalBody>
                  <ModalCloseButton />
                  <ModalFooter>
                     <Button
                        ariant='ghost'
                        colorScheme='gray'
                        mr={3}
                        onClick={() => {
                           onCloseUpdateName();
                        }}
                     >
                        <span className='text-[#374b73]'>Close</span>
                     </Button>
                     <Button
                        onClick={() => {
                           onCloseUpdateName();
                           formikInfor.handleSubmit();
                        }}
                        colorScheme='facebook'
                     >
                        Change
                     </Button>
                  </ModalFooter>
               </ModalContent>
            </Modal>
         </>
      );
   };
   const renderModalUpdateCard = () => {
      return (
         <>
            <Modal
               size='3xl'
               isCentered
               isOpen={isOpenUpdateCard}
               onClose={onCloseUpdateCard}
            >
               <ModalOverlay />
               <ModalContent>
                  <ModalHeader className='w-10/12 mx-auto text-center'>
                     <span className='text-xl lg:text-3xl'>Add a new card</span>
                  </ModalHeader>
                  <ModalBody className='w-full'>
                     <CardElement
                        options={CARD_ELEMENT_OPTIONS}
                        className='py-4 px-2 border-2 rounded-md font-bold '
                     />
                  </ModalBody>
                  <ModalCloseButton />
                  <ModalFooter>
                     <Button
                        ariant='ghost'
                        colorScheme='gray'
                        mr={3}
                        onClick={() => {
                           onCloseUpdateCard();
                        }}
                     >
                        <span className='text-[#374b73]'>Close</span>
                     </Button>
                     <Button
                        onClick={handleSubmitCreditCard}
                        colorScheme='facebook'
                     >
                        Add
                     </Button>
                  </ModalFooter>
               </ModalContent>
            </Modal>
         </>
      );
   };
   const renderModalChangeAvatar = () => {
      return (
         <>
            <Modal
               size='2xl'
               isCentered
               isOpen={isOpenChangeAvatar}
               onClose={onCloseChangeAvatar}
            >
               <ModalOverlay />
               <ModalContent>
                  <ModalHeader className='w-10/12 mx-auto text-center'>
                     <span className='text-xl text-[#5a6e8c] lg:text-3xl'>
                        Change your avatar
                     </span>
                  </ModalHeader>
                  <ModalBody className='w-full'>
                     <img
                        className='w-96 mx-auto h-96 object-cover rounded-full'
                        src={uploadImg !== null ? uploadImg : ''}
                     />
                  </ModalBody>
                  <ModalCloseButton />
                  <ModalFooter>
                     <Button
                        ariant='ghost'
                        colorScheme='gray'
                        mr={3}
                        onClick={() => {
                           onCloseChangeAvatar();
                           setUploadImg(null);
                        }}
                     >
                        <span className='text-[#374b73]'>Close</span>
                     </Button>
                     <Button
                        onClick={(e) => {
                           submitUploadImage(e);
                        }}
                        colorScheme='facebook'
                     >
                        Update
                     </Button>
                  </ModalFooter>
               </ModalContent>
            </Modal>
         </>
      );
   };
   const handleUploadImage = (e) => {
      let file = e.target.files[0];
      if (file) {
         if (
            file.type === 'image/jpeg' ||
            file.type === 'image/jpg' ||
            file.type === 'image/png'
         ) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
               setUploadImg(event.target.result);
               onOpenChangeAvatar();
            };
         }
         setSelectedImg(file);
      }
   };
   const submitUploadImage = (e) => {
      const formData = new FormData();
      formData.append('file', selectedImage);
      dispatch(uploadUserAvatarAction(formData, userDetail?.id));
      setTimeout(() => {
         setUploadImg(null);
         onCloseChangeAvatar();
      }, 4000);
   };
   const handleSubmitCreditCard = async () => {
      if (!stripe || !elements) {
         return;
      }
      toast.loading('Wait a sec !', { duration: 1000 });
      const cardElement = elements.getElement(CardElement);
      const { token, error } = await stripe.createToken(cardElement);
      onCloseUpdateCard();
      if (error) {
         toast.dismiss();
         toast.error(error.message.toString());
      } else {
         const data = {
            card_token: token?.id,
            customer_stripe_id: userDetail?.stripe_customer_id,
         };
         await dispatch(createNewCardAction(data, userDetail?.id));
      }
   };
   return (
      <div className='w-10/12 mx-auto'>
         <div className='grid grid-cols-12 relative z-0'>
            <div className='col-span-12 xl:col-span-5 relative z-[5] h-fit xl:h-screen'>
               <div className='w-11/12 lg:w-9/12 mx-auto flex flex-col my-5'>
                  <div className='w-full bg-white border border-gray-200 rounded-lg shadow-xl shadow-gray-300 backdrop-filter h-fit'>
                     <div className='flex justify-end px-4 pt-4 relative'>
                        <button
                           onClick={() => {
                              setOpenProfileSetting(!openProfileSetting);
                           }}
                           className='inline-block text-gray-500  hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5'
                           type='button'
                        >
                           <EllipsisHorizontalIcon className='w-5 h-5' />
                        </button>
                        {openProfileSetting ? (
                           <div className='z-10 absolute top-14 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-40 '>
                              <ul className='py-2'>
                                 {actionList.map((item) => {
                                    return (
                                       <li key={Math.random()}>
                                          <button
                                             onClick={item.action}
                                             className='block w-full px-4 py-2 text-sm font-bold text-[#374b73] hover:bg-gray-100 '
                                          >
                                             <span className='w-full flex justify-start'>
                                                {item.label}
                                             </span>
                                          </button>
                                       </li>
                                    );
                                 })}
                              </ul>
                           </div>
                        ) : (
                           <></>
                        )}
                     </div>

                     <div className='flex flex-col items-center pb-10'>
                        <div className='relative w-5/12 mx-auto flex justify-center'>
                           <img
                              className='w-28 h-28 lg:w-40 lg:h-40 mb-3 rounded-full shadow-lg object-cover'
                              src={
                                 userDetail?.avatar
                                    ? userDetail?.avatar
                                    : alterAvatar
                              }
                              alt='Bonnie image'
                           />
                           <label
                              htmlFor='uploadAvatar'
                              className='bg-white rounded-md shadow-md text-[#374b73] shadow-gray-300 hover:bg-[#374b73] hover:text-white p-2 top-0 right-5 xl:right-[-20%] absolute cursor-pointer transition-all duration-300'
                           >
                              <CameraIcon className='w-4 h-4' />
                           </label>
                           <input
                              onChange={handleUploadImage}
                              className='hidden'
                              id='uploadAvatar'
                              type='file'
                           />
                        </div>
                        <h5 className='mb-1 text-2xl font-bold text-[#374b73] '>
                           {userDetail?.first_name}&nbsp;
                           {userDetail?.last_name}
                        </h5>
                        <span className='text-sm text-gray-500  mb-5'>
                           {userDetail?.email}
                        </span>
                        <div className='w-10/12 mx-auto'>
                           <div className='text-left my-1'>
                              <h1 className='text-[#5a6e8c] font-bold text-lg lg:text-2xl flex items-center'>
                                 <MapPinIcon className='h-4 w-4 lg:h-6 lg:w-6 mr-0 lg:mr-2' />
                                 Address
                              </h1>
                           </div>
                           <div className='flex items-center my-1'>
                              <div className='w-2/4 lg:w-1/4'>
                                 <label
                                    className='text-sm lg:text-md font-semibold lg:pr-3 text-gray-600'
                                    htmlFor='street'
                                 >
                                    Street:
                                 </label>
                              </div>
                              <div className='w-2/4 lg:w-3/4'>
                                 <Input
                                    disabled={!enableInput}
                                    name='street'
                                    _focus={{
                                       borderColor: '#374b73',
                                    }}
                                    onChange={formikAddress.handleChange}
                                    variant='flushed'
                                    placeholder={userDetail?.Address?.street}
                                 />
                                 {formikAddress.errors.street ? (
                                    <p className='text-red-600 ml-1 text-sm flex'>
                                       {formikAddress.errors.street}
                                    </p>
                                 ) : (
                                    <></>
                                 )}
                              </div>
                           </div>
                           <div className='flex items-center my-1'>
                              <div className='w-2/4 lg:w-1/4'>
                                 <label
                                    className='text-sm lg:text-md font-semibold lg:pr-3 text-gray-600'
                                    htmlFor='ward'
                                 >
                                    Ward:
                                 </label>
                              </div>
                              <div className='w-2/4 lg:w-3/4'>
                                 <Input
                                    disabled={!enableInput}
                                    name='ward'
                                    _focus={{
                                       borderColor: '#374b73',
                                    }}
                                    onChange={formikAddress.handleChange}
                                    variant='flushed'
                                    placeholder={userDetail?.Address?.ward}
                                 />
                                 {formikAddress.errors.ward ? (
                                    <p className='text-red-600 ml-1 text-sm flex'>
                                       {formikAddress.errors.ward}
                                    </p>
                                 ) : (
                                    <></>
                                 )}
                              </div>
                           </div>
                           <div className='flex items-center my-1'>
                              <div className='w-2/4 lg:w-1/4'>
                                 <label
                                    className='text-sm lg:text-md font-semibold lg:pr-3 text-gray-600'
                                    htmlFor='district'
                                 >
                                    District:
                                 </label>
                              </div>
                              <div className='w-2/4 lg:w-3/4'>
                                 <Input
                                    disabled={!enableInput}
                                    name='district'
                                    _focus={{
                                       borderColor: '#374b73',
                                    }}
                                    onChange={formikAddress.handleChange}
                                    variant='flushed'
                                    placeholder={userDetail?.Address?.district}
                                 />
                                 {formikAddress.errors.district ? (
                                    <p className='text-red-600 ml-1 text-sm flex'>
                                       {formikAddress.errors.district}
                                    </p>
                                 ) : (
                                    <></>
                                 )}
                              </div>
                           </div>
                           <div className='flex items-center my-1'>
                              <div className='w-2/4 lg:w-1/4'>
                                 <label
                                    className='text-sm lg:text-md font-semibold lg:pr-3 text-gray-600'
                                    htmlFor='province'
                                 >
                                    Province:
                                 </label>
                              </div>
                              <div className='w-2/4 lg:w-3/4'>
                                 <Input
                                    disabled={!enableInput}
                                    name='province'
                                    _focus={{
                                       borderColor: '#374b73',
                                    }}
                                    onChange={formikAddress.handleChange}
                                    variant='flushed'
                                    placeholder={userDetail?.Address?.province}
                                 />
                                 {formikAddress.errors.province ? (
                                    <p className='text-red-600 ml-1 text-sm flex'>
                                       {formikAddress.errors.province}
                                    </p>
                                 ) : (
                                    <></>
                                 )}
                              </div>
                           </div>
                           {enableInput ? (
                              <div className='flex justify-end mt-3'>
                                 <Button
                                    mr={'10px'}
                                    onClick={() => {
                                       setEnableInput(false);
                                    }}
                                    colorScheme='gray'
                                 >
                                    Cancel
                                 </Button>
                                 <Button
                                    onClick={onOpenUpdateInfor}
                                    colorScheme='facebook'
                                 >
                                    Save
                                 </Button>
                              </div>
                           ) : (
                              <></>
                           )}
                           <div className='divider bg-gray-200 my-5'></div>
                           <div className='text-left my-1'>
                              <h1 className='text-[#5a6e8c] font-bold text-2xl flex items-center'>
                                 <PhoneIcon className='h-6 w-6 mr-2' /> Phone
                                 Number
                              </h1>
                              <div className='flex items-center my-2'>
                                 <div className='w-2/4 lg:w-1/4'>
                                    <label
                                       className='text-sm lg:text-md font-semibold lg:pr-3 text-gray-600'
                                       htmlFor='province'
                                    >
                                       Phone:
                                    </label>
                                 </div>
                                 <div className='w-2/4 lg:w-3/4'>
                                    <Input
                                       name='phone'
                                       onChange={formikInfor.handleChange}
                                       disabled={!enablePhone}
                                       _focus={{
                                          borderColor: '#374b73',
                                       }}
                                       variant='flushed'
                                       placeholder={
                                          userDetail?.phone
                                             ? userDetail.phone
                                             : '000 000 000 00'
                                       }
                                    />
                                 </div>
                              </div>
                              {enablePhone ? (
                                 <div className='flex justify-end mt-3'>
                                    <Button
                                       mr={'10px'}
                                       onClick={() => {
                                          setEnablePhone(false);
                                       }}
                                       colorScheme='gray'
                                    >
                                       Cancel
                                    </Button>
                                    <Button
                                       onClick={() => {
                                          formikInfor.handleSubmit();
                                          setEnablePhone(false);
                                       }}
                                       colorScheme='facebook'
                                    >
                                       Change
                                    </Button>
                                 </div>
                              ) : (
                                 <></>
                              )}
                           </div>
                        </div>
                        {renderModalChangePassword()}
                        {renderModalUpdateName()}
                        {renderModalUpdateCard()}
                        {renderModalUpdateAddress()}
                        {renderModalChangeAvatar()}
                     </div>
                  </div>
               </div>
            </div>
            <div className='col-span-12 xl:col-span-7'>
               <div className='w-11/12 mx-auto my-5 h-fit rounded-md bg-gray-white shadow-lg shadow-gray-300 py-5 px-5 bg-white'>
                  <div className='text-[#5a6e8c] font-bold text-lg lg:text-2xl flex items-center justify-between'>
                     <div className='flex items-center'>
                        <CreditCardIcon className='h-4 w-4 lg:h-6 lg:w-6 mr-0 lg:mr-2' />
                        <h2>Card Information</h2>
                     </div>
                     <div
                        onClick={() => {
                           onOpenUpdateCard();
                        }}
                        className='p-2 cursor-pointer hover:bg-[#374b73] rounded-md hover:text-white transition-all duration-300'
                     >
                        <PencilSquareIcon className='h-4 w-4 lg:h-6 lg:w-6' />
                     </div>
                  </div>

                  <div className='py-5 overflow-scroll sm:overflow-visible'>
                     <div className='mx-auto payment-card'>
                        {listSavedCards?.length > 0 ? (
                           <Slider
                              infinite={false}
                              speed={1000}
                              slidesToShow={1}
                              slidesToScroll={1}
                              autoplay={false}
                              pauseOnHover={true}
                              swiper={true}
                              dots={true}
                           >
                              {listSavedCards.map((item) => {
                                 return (
                                    <div
                                       className='px-3 my-5'
                                       key={Math.random()}
                                    >
                                       <PaymentCard
                                          card={item}
                                          user={userDetail}
                                       />
                                    </div>
                                 );
                              })}
                           </Slider>
                        ) : (
                           <h1 className='text-center text-2xl text-[#374b73] font-semibold'>
                              No card added yet
                           </h1>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UserProfile;
