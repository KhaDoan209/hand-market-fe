import React from 'react';
import { EnvelopeIcon } from '@heroicons/react/20/solid';
import headphone from '../assets/svg/headphone.svg';
import { useOutletContext } from 'react-router-dom';
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   useDisclosure,
   Link,
   Button,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { sendContactFormAction } from '../redux/action/auth-action';
const Contact = () => {
   const { dispatch, navigate } = useOutletContext();
   const { isOpen, onOpen, onClose } = useDisclosure();
   const formik = useFormik({
      initialValues: {
         email: '',
         content: '',
         first_name: '',
         last_name: '',
      },
      onSubmit: (values) => {
         dispatch(sendContactFormAction(values));
      },
   });
   return (
      <>
         <div className='w-10/12 mx-auto'>
            <div className='my-10 bg-white py-3 px-5 md:py-5 rounded-md shadow-md shadow-gray-300 grid grid-cols-12 text-[#374b73]'>
               <div className='col-span-12 my-4 text-justify'>
                  <div className='col-span-12 text-center mb-16'>
                     <h1 className='text-2xl md:text-4xl font-bold'>
                        Contact Us
                     </h1>
                  </div>
                  <div className='grid grid-cols-12'>
                     <div className='col-span-12 lg:col-span-6 lg:border-r lg:border-gray-200 pr-5'>
                        <h1 className='text-md md:text-xl font-bold opacity-80 text-gray-700 mb-5'>
                           The Hand Market E-commerce platform corporation
                        </h1>
                        <div className='flex mt-3'>
                           <h1 className='text-md font-bold mb-3'>
                              Office address:
                           </h1>
                           <p className='ml-2 text-gray-700'>
                              193 Trưng Nữ Vương, Hòa Thuận Đông Hải Châu, Đà
                              Nẵng
                           </p>
                        </div>
                        <div className='flex mt-3 justify-between'>
                           <div className='flex'>
                              <img
                                 src={headphone}
                                 className='w-6 h-6'
                              />
                              <p className='ml-2'>0907 874 726</p>
                           </div>
                           <div className='flex ml-10'>
                              <EnvelopeIcon className='w-6 h-6' />
                              <a
                                 className='ml-2'
                                 href='mailto:handmarket@gmail.com'
                              >
                                 handmarket@gmail.com
                              </a>
                           </div>
                        </div>
                        <div className='flex mt-5 justify-between items-center'>
                           <div className='flex'>
                              <h1 className='text-md font-bold mb-3'>
                                 Work hour:
                              </h1>
                              <p className='ml-2'>8:00 - 21:00</p>
                           </div>
                           <Link
                              onClick={onOpen}
                              className='text-md'
                           >
                              Contact Policy
                           </Link>
                        </div>
                        <iframe
                           className='w-full h-[300px] lg:h-[400px] border-none mt-3'
                           src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.221636277007!2d108.21697847489428!3d16.053984539846358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c8b41dc80d%3A0xdf3c20315132b528!2zMTkzIFRyxrBuZyBO4buvIFbGsMahbmcsIEjDsmEgVGh14bqtbiDEkMO0bmcsIEjhuqNpIENow6J1LCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1694700220095!5m2!1svi!2s'
                           allowFullScreen
                           loading='lazy'
                           referrerPolicy='no-referrer-when-downgrade'
                        />
                     </div>
                     <div className='mt-10 lg:mt-0 col-span-12 lg:col-span-6 lg:border-l lg:border-gray-200 pl-5'>
                        <h1 className='text-3xl font-bold text-center'>
                           Contact Form
                        </h1>
                        <form className='mt-10'>
                           <div className='flex mb-6'>
                              <div className='w-2/4 mr-2'>
                                 <label
                                    htmlFor='firstName'
                                    className='block mb-2 text-lg text-color-blue font-bold'
                                 >
                                    First Name
                                 </label>
                                 <input
                                    onChange={formik.handleChange}
                                    name='first_name'
                                    className='block w-full p-3 my-3 text-gray-800 text-sm  border-gray-200 border-2 rounded-lg focus:border-[#374b73] focus:shadow-md input-focus-shadow outline-noner ring-0 focus:ring-0'
                                    placeholder='Enter your first name'
                                    required
                                 />
                              </div>
                              <div className='w-2/4 ml-2'>
                                 <label
                                    htmlFor='lastName'
                                    className='block mb-2 text-lg text-color-blue font-bold'
                                 >
                                    Last Name
                                 </label>
                                 <input
                                    onChange={formik.handleChange}
                                    name='last_name'
                                    className='block w-full p-3 my-3 text-gray-800 text-sm  border-gray-200 border-2 rounded-lg focus:border-[#374b73] focus:shadow-md input-focus-shadow outline-noner ring-0 focus:ring-0'
                                    placeholder='Enter your last name'
                                    required
                                 />
                              </div>
                           </div>
                           <div className='mb-6'>
                              <label
                                 htmlFor='email'
                                 className='block mb-2 text-lg text-color-blue font-bold'
                              >
                                 Email
                              </label>
                              <input
                                 onChange={formik.handleChange}
                                 name='email'
                                 type='email'
                                 className='block w-full p-3 my-3 text-gray-800 text-sm  border-gray-200 border-2 rounded-lg focus:border-[#374b73] focus:shadow-md input-focus-shadow outline-noner ring-0 focus:ring-0'
                                 placeholder='Enter your email'
                                 required
                              />
                           </div>
                           <div className='my-6'>
                              <label
                                 htmlFor='email'
                                 className='block mb-2 text-lg text-color-blue font-bold'
                              >
                                 What can we help you with ?
                              </label>
                              <textarea
                                 onChange={formik.handleChange}
                                 rows={5}
                                 name='content'
                                 type='text'
                                 className='block w-full p-3 my-3 text-gray-800 text-sm  border-gray-200 border-2 rounded-lg focus:border-[#374b73] focus:shadow-md input-focus-shadow outline-noner ring-0 focus:ring-0'
                                 placeholder='What can we help you ?'
                                 required
                              />
                           </div>
                           <div className='flex justify-end'>
                              <button
                                 onClick={formik.handleSubmit}
                                 type='submit'
                                 className='text-white font-bold bg-[#FFB4B4] hover:bg-opacity-90 hover:shadow-lg hover:shadow-zinc-200 duration-200 focus:ring-4 focus:outline-none rounded-lg text-md w-1/5 px-4 py-3 text-center my-2 hover:bg-[#374b73]'
                              >
                                 Send
                              </button>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <Modal
            scrollBehavior='inside'
            size='2xl'
            isOpen={isOpen}
            onClose={onClose}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>
                  <h1 className='text-3xl font-bold mb-3 text-center mt-5'>
                     Contact Policy
                  </h1>
               </ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <div className='my-4 text-justify'>
                     <h1 className='text-xl font-bold mb-3'>
                        I. Privacy Policy
                     </h1>
                     <li>
                        <b>Information Collection:</b> We collect contact
                        information, including names and email addresses, when
                        users fill out our contact form. This information is
                        used solely for communication purposes.
                     </li>
                     <li>
                        <b>Use of Contact Information:</b> Contact information
                        provided by users is used to respond to inquiries and
                        provide customer support. We do not share or sell this
                        information to third parties.
                     </li>
                     <li>
                        <b>Data Security:</b> We employ security measures to
                        protect users' contact information and prevent
                        unauthorized access. We take data security seriously.
                     </li>
                     <li>
                        <b>Cookies</b> We use cookies and tracking tools to
                        enhance user experience and gather analytical data.
                        Users can manage cookie preferences in their browsers.
                     </li>
                  </div>
                  <div className='my-4 text-justify'>
                     <h1 className='text-xl font-bold mb-3'>
                        II. Email and Marketing Policy
                     </h1>
                     <li>
                        <b>Email Communications:</b> By providing their email
                        addresses, users consent to receive occasional email
                        communications from us, including newsletters and
                        promotional offers.
                     </li>
                     <li>
                        <b>Customer Data:</b> We do not share or sell our
                        customer contact information to third parties for
                        marketing purposes.
                     </li>
                  </div>
                  <div className='my-4 text-justify'>
                     <h1 className='text-xl font-bold mb-3'>
                        III. Contact Information Handling Policy
                     </h1>
                     <li>
                        <b>Data Usage:</b>Contact information is used solely for
                        the purpose of responding to user inquiries and
                        providing customer support.
                     </li>
                     <li>
                        <b>Data Retention:</b> We retain contact information for
                        a reasonable duration and delete it when it is no longer
                        needed.
                     </li>
                     <li>
                        <b>User Rights:</b> Users have the right to request
                        access, correction, or deletion of their contact
                        information in our records.
                     </li>
                  </div>{' '}
                  <div className='my-4 text-justify'>
                     <h1 className='text-xl font-bold mb-3'>
                        III. Security Policy
                     </h1>
                     <li>
                        <b>Data Security:</b> We employ industry-standard
                        security measures to safeguard users' contact
                        information from unauthorized access and breaches.
                     </li>
                     <li>
                        <b>Breach Reporting:</b> In the event of a data breach,
                        we will notify affected users and authorities in
                        compliance with applicable laws.
                     </li>
                  </div>{' '}
                  <div className='my-4 text-justify'>
                     <h1 className='text-xl font-bold mb-3'>
                        III. Contact and Customer Support Policy
                     </h1>
                     <li>
                        <b>Customer Support:</b> For assistance, users can
                        contact our customer support department through our
                        contact form or email. We strive to respond within 24
                        hours.
                     </li>
                  </div>
                  <div className='my-4 text-justify'>
                     <h1 className='text-xl font-bold mb-3'>
                        III. Legal Policy
                     </h1>
                     <li>
                        <b>Applicable Laws:</b> These policies are subject to
                        the laws and jurisdiction of the Hand Market
                        Corporation.
                     </li>
                  </div>
               </ModalBody>
               <ModalFooter>
                  <Button
                     colorScheme='gray'
                     mr={3}
                     onClick={onClose}
                  >
                     Close
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
};

export default Contact;
