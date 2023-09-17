import React from 'react';
import {
   Accordion,
   AccordionItem,
   AccordionButton,
   AccordionPanel,
   AccordionIcon,
} from '@chakra-ui/react';
const FAQ = () => {
   return (
      <div className='w-11/12 md:w-8/12 lg:w-5/12 mx-auto'>
         <div className='my-10 bg-white py-3 px-5 md:py-5 rounded-md shadow-md shadow-gray-300 grid grid-cols-12 text-[#374b73] '>
            <div className='col-span-12 text-center mb-16'>
               <h1 className='text-2xl md:text-4xl font-bold'>FAQs</h1>
            </div>
            <div className='col-span-12 text-[#374b73] text-justify'>
               <Accordion allowMultiple>
                  <AccordionItem>
                     <h2>
                        <AccordionButton>
                           <h1 className='py-2 mr-2 font-bold text-md md:text-lg'>
                              1. How can I place an order ?
                           </h1>
                           <AccordionIcon />
                        </AccordionButton>
                     </h2>
                     <AccordionPanel pb={4}>
                        To place an order, simply browse our online store,
                        select the products you wish to purchase, add them to
                        your cart, and proceed to checkout. Follow the steps to
                        provide shipping and payment information to complete
                        your order.
                     </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                     <h2>
                        <AccordionButton>
                           <h1 className='py-2 mr-2 font-bold text-md md:text-lg'>
                              2. What payment methods do you accept ?
                           </h1>
                           <AccordionIcon />
                        </AccordionButton>
                     </h2>
                     <AccordionPanel pb={4}>
                        We accept a variety of payment methods, including
                        credit/debit cards (Visa, MasterCard, American Express),
                        PayPal, and bank transfers. You can choose your
                        preferred payment option during checkout.
                     </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                     <h2>
                        <AccordionButton>
                           <h1 className='py-2 mr-2 font-bold text-md md:text-lg'>
                              3. How do I track my order ?
                           </h1>
                           <AccordionIcon />
                        </AccordionButton>
                     </h2>
                     <AccordionPanel pb={4}>
                        Once your order has been shipped, you will receive an
                        order code via email. You can use this number to monitor
                        the status and location of your package on our website
                        or the courier's website.
                     </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                     <h2>
                        <AccordionButton>
                           <h1 className='py-2 mr-2 font-bold text-md md:text-lg'>
                              4. What is your return policy ?
                           </h1>
                           <AccordionIcon />
                        </AccordionButton>
                     </h2>
                     <AccordionPanel pb={4}>
                        Our return policy allows you to return items within 30
                        days of delivery for a full refund or exchange. Please
                        review our Returns & Exchanges page for detailed
                        instructions and eligibility criteria.
                     </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                     <h2>
                        <AccordionButton>
                           <h1 className='py-2 mr-2 font-bold text-md md:text-lg'>
                              5. Do you offer international shipping ?
                           </h1>
                           <AccordionIcon />
                        </AccordionButton>
                     </h2>
                     <AccordionPanel pb={4}>
                        No, we offer international shipping within Da Nang city.
                        Shipping costs and delivery times may vary depending on
                        your choice. Please visit our Shipping Information page
                        for more details.
                     </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                     <h2>
                        <AccordionButton>
                           <h1 className='py-2 mr-2 font-bold text-md md:text-lg'>
                              6. How can I contact your customer support team ?
                           </h1>
                           <AccordionIcon />
                        </AccordionButton>
                     </h2>
                     <AccordionPanel pb={4}>
                        You can reach our customer support team through our
                        Contact Us page or by sending an email to
                        handmarket@gmail.com We aim to respond to inquiries
                        within 24 hours.
                     </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                     <h2>
                        <AccordionButton>
                           <h1 className='py-2 mr-2 font-bold text-md md:text-lg'>
                              7. What if I receive a damaged or defective item ?
                           </h1>
                           <AccordionIcon />
                        </AccordionButton>
                     </h2>
                     <AccordionPanel pb={4}>
                        If you receive a damaged or defective item, please
                        contact our customer support team immediately. We will
                        arrange for a replacement or refund, as applicable, and
                        provide instructions for returning the item.
                     </AccordionPanel>
                  </AccordionItem>{' '}
                  <AccordionItem>
                     <h2>
                        <AccordionButton>
                           <h1 className='py-2 mr-2 font-bold text-md md:text-lg'>
                              8. Can I change my order after it has been placed
                              ?
                           </h1>
                           <AccordionIcon />
                        </AccordionButton>
                     </h2>
                     <AccordionPanel pb={4}>
                        Unfortunately, once an order has been placed, it cannot
                        be modified. Please double-check your order before
                        completing the checkout process.
                     </AccordionPanel>
                  </AccordionItem>{' '}
                  <AccordionItem>
                     <h2>
                        <AccordionButton>
                           <h1 className='py-2 mr-2 font-bold text-md md:text-lg'>
                              9. How do I unsubscribe from your newsletters ?
                           </h1>
                           <AccordionIcon />
                        </AccordionButton>
                     </h2>
                     <AccordionPanel pb={4}>
                        You can easily unsubscribe from our newsletters by
                        clicking the "Unsubscribe" link at the bottom of any
                        email you receive from us. Alternatively, you can update
                        your email preferences in your account settings.
                     </AccordionPanel>
                  </AccordionItem>{' '}
                  <AccordionItem>
                     <h2>
                        <AccordionButton>
                           <h1 className='py-2 mr-2 font-bold text-md md:text-lg'>
                              10. Is my personal information secure with you?
                           </h1>
                           <AccordionIcon />
                        </AccordionButton>
                     </h2>
                     <AccordionPanel pb={4}>
                        Yes, we take the security and privacy of your personal
                        information seriously. We employ industry-standard
                        security measures to protect your data. Please review
                        our Privacy Policy for more details.
                     </AccordionPanel>
                  </AccordionItem>
               </Accordion>
            </div>
         </div>
      </div>
   );
};

export default FAQ;
