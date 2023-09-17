import React, { useState, useEffect } from 'react';
import {
   EllipsisHorizontalIcon,
   UserCircleIcon,
} from '@heroicons/react/20/solid';
import { toast } from 'react-hot-toast';
import { useParams, useOutletContext } from 'react-router-dom';
import {
   changePasswordAction,
   getUserDetailAction,
   updateUserAddressAction,
   changeUserRoleAction,
} from '../../../redux/action/user-action';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { User, Shipper, Admin } from '../../../utils/variables';
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
import alterAvatar from '../../../assets/img/alter-ava.png';
import { Line, Pie } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { getListOrderByUserForAdminAction } from '../../../redux/action/order-action';
import { getUserFromLocal } from '../../../utils/utils-functions';
import { OrderStatus } from '../../../enums/OrderStatus';
import moment from 'moment/moment';
import {
   countOrdersByDate,
   countOrderTypePercent,
} from '../../../utils/utils-functions';
const AccountDetail = () => {
   const userDetail = useSelector((state) => state.userReducer?.user_detail);
   const list_order_by_user_for_admin = useSelector(
      (state) => state.orderReducer.list_order_by_user_for_admin
   );
   const userSignedIn = getUserFromLocal();
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
   const { dispatch, navigate } = useOutletContext();
   const { id } = useParams();
   const [openProfileSetting, setOpenProfileSetting] = useState(false);
   const [enableInput, setEnableInput] = useState(false);
   const [enableSelect, setEnableSelect] = useState(false);
   const [roleToUpdate, setRoleToUpdate] = useState(userDetail?.role);
   const actionList = [
      {
         label: 'Edit information',
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
         label: 'Change role',
         action: () => {
            setOpenProfileSetting(!openProfileSetting);
            {
               enableSelect == true
                  ? setEnableSelect(false)
                  : setEnableSelect(true);
            }
         },
      },
      {
         label: 'Reset password',
         action: () => {
            setOpenProfileSetting(!openProfileSetting);
            onOpenChangePassword();
         },
      },
   ];
   const labels = countOrdersByDate(list_order_by_user_for_admin).map(
      (item) => item.order_date
   );
   const values = countOrdersByDate(list_order_by_user_for_admin).map(
      (item) => item.order_total
   );
   const lineChartData = {
      labels: labels,
      datasets: [
         {
            label: 'Order Total',
            data: values,
            borderColor: '#5a6e8c',
            borderWidth: 2,
            fill: false,
         },
      ],
   };
   const lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
         x: {
            type: 'time',
            time: {
               unit: 'day',
               displayFormats: {
                  day: 'MMM D',
               },
            },
            title: {
               display: true,
               text: 'Order Date',
            },
         },
         y: {
            beginAtZero: true,
            title: {
               display: true,
               text: 'Order Total',
            },
         },
      },
   };
   const doughnutChartData = {
      labels: countOrderTypePercent(list_order_by_user_for_admin).map(
         (item) => item.status
      ),
      datasets: [
         {
            label: '%',
            data: countOrderTypePercent(list_order_by_user_for_admin).map(
               (item) => item.percentage
            ),
            backgroundColor: ['#66CC6B', '#FFA55A', '#ffde74', '#f95959'],
            hoverBackgroundColor: ['#80E27E', '#ffa974', '#f5e180', '#ff847c'],
         },
      ],
   };
   const doughnutChartoptions = {
      plugins: {
         legend: {
            position: 'bottom',
         },
         title: {
            display: true,
            text: 'Order Status Percentage',
            fontSize: 16,
         },
      },
   };
   const formikAddress = useFormik({
      enableReinitialize: true,
      initialValues: {
         street: userDetail.Address?.street,
         province: userDetail.Address?.province,
         district: userDetail.Address?.district,
         ward: userDetail.Address?.ward,
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
   useEffect(() => {
      dispatch(getUserDetailAction(id));
      if (userSignedIn?.role === Admin) {
         dispatch(getListOrderByUserForAdminAction(id, undefined));
      }
   }, []);
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
   const renderModalUpdateInfor = () => {
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
                        {`Do you want to update ${userDetail?.email}'s address ?`}
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
   return (
      <div className='grid grid-cols-12 relative z-0'>
         <div className='col-span-5 relative z-[5] h-screen'>
            <div className='w-11/12 lg:w-9/12 mx-auto flex flex-col my-5'>
               <div className='w-full bg-white border border-gray-200 rounded-lg shadow-xl shadow-gray-200 backdrop-filter h-fit'>
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
                     <img
                        className='w-28 h-28 lg:w-40 lg:h-40 mb-3 rounded-full shadow-lg object-cover'
                        src={
                           userDetail.avatar ? userDetail.avatar : alterAvatar
                        }
                        alt='Bonnie image'
                     />
                     <h5 className='mb-1 text-2xl font-semibold text-[#374b73] '>
                        {userDetail.first_name}&nbsp;{userDetail.last_name}
                     </h5>
                     <span className='text-sm text-gray-500  mb-5'>
                        {userDetail.email}
                     </span>
                     <div className='w-10/12 mx-auto'>
                        <div className='text-left my-1'>
                           <h1 className='text-[#374b73] font-bold text-lg lg:text-2xl flex items-center'>
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
                                 placeholder={userDetail.Address?.street}
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
                                 placeholder={userDetail.Address?.ward}
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
                                 placeholder={userDetail.Address?.district}
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
                                 placeholder={userDetail.Address?.province}
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
                              {renderModalUpdateInfor()}
                           </div>
                        ) : (
                           <></>
                        )}
                        <div className='divider bg-gray-200 my-5'></div>
                        <div className='text-left my-1'>
                           <h1 className='text-[#374b73] font-bold text-2xl flex items-center'>
                              <UserCircleIcon className='h-6 w-6 mr-2' /> Role
                           </h1>
                           <div className='flex items-center my-2'>
                              <div className='w-2/4 lg:w-1/4'>
                                 <label
                                    className='text-sm lg:text-md font-semibold lg:pr-3 text-gray-600'
                                    htmlFor='province'
                                 >
                                    Role:
                                 </label>
                              </div>
                              <div className='w-2/4 lg:w-3/4'>
                                 {enableSelect ? (
                                    <Select
                                       onChange={(e) => {
                                          setRoleToUpdate(e.target.value);
                                       }}
                                       className='border-none'
                                       variant={'flushed'}
                                       placeholder='Pick a role'
                                    >
                                       <option
                                          className='px-1 py-2'
                                          value={
                                             userDetail?.role === 'User'
                                                ? Shipper
                                                : User
                                          }
                                       >
                                          {userDetail?.role === 'User'
                                             ? Shipper
                                             : User}
                                       </option>
                                    </Select>
                                 ) : (
                                    <Input
                                       disabled={true}
                                       _focus={{
                                          borderColor: '#374b73',
                                       }}
                                       variant='flushed'
                                       placeholder={userDetail?.role}
                                    />
                                 )}
                              </div>
                           </div>
                           {enableSelect ? (
                              <div className='flex justify-end mt-3'>
                                 <Button
                                    mr={'10px'}
                                    onClick={() => {
                                       setEnableSelect(false);
                                    }}
                                    colorScheme='gray'
                                 >
                                    Cancel
                                 </Button>
                                 <Button
                                    onClick={() => {
                                       dispatch(
                                          changeUserRoleAction(
                                             userDetail?.id,
                                             roleToUpdate
                                          )
                                       );
                                       setEnableSelect(false);
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
                  </div>
               </div>
            </div>
         </div>
         <div className='col-span-7'>
            <div className='w-11/12 flex justify-center mx-auto h-1/4 lg:h-2/5 rounded-md bg-white shadow-lg shadow-gray-200 my-5'>
               <Line
                  datasetIdKey='id'
                  data={lineChartData}
                  options={lineChartOptions}
               />
            </div>
            <div className='w-11/12 flex justify-center mt-10 mx-auto h-1/4 lg:h-[50vh] rounded-md shadow-lg shadow-gray-200 my-5 bg-white'>
               <Pie
                  datasetIdKey='id'
                  data={doughnutChartData}
                  options={doughnutChartoptions}
               />
            </div>
         </div>
      </div>
   );
};

export default AccountDetail;
