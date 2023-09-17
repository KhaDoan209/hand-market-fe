import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from '../components/Footer';
const AboutUs = () => {
   return (
      <>
         <div className='w-10/12 md:w-3/4 mx-auto'>
            <div className='mt-5 bg-white py-3 px-4 md:py-5 md:px-10 rounded-md shadow-sm shadow-gray-300 grid grid-cols-12 text-[#374b73]'>
               <div className='col-span-12 my-4 text-justify'>
                  <div className='col-span-12 text-center mb-10 '>
                     <h1 className='text-2xl md:text-4xl font-bold'>
                        About Us
                     </h1>
                  </div>
                  <h1 className='text-2xl font-bold mb-3'>I. Introduction</h1>
                  <p>
                     Welcome to Hand Market, your premier online shopping
                     destination! Hand Market is not just an e-commerce
                     platform; it's a hub of convenience, quality, and variety.
                     Our mission is to redefine your shopping experience,
                     providing you with a wide-ranging selection of everyday
                     essentials, from groceries and household items to
                     electronics and fashion—all at your fingertips. We
                     understand the fast-paced world you live in, and our goal
                     is to make your life easier by delivering top-notch
                     products right to your doorstep.
                  </p>
               </div>
               <div className='col-span-12 my-4'>
                  <h1 className='text-2xl font-bold mb-3'>II. Our Mission</h1>
                  <p>
                     At Hand Market, we're driven by a clear and simple mission:
                     to offer you the best products at exceptional prices. We
                     are committed to ensuring that every item you purchase from
                     us meets the highest standards of quality. Our team works
                     tirelessly to source products from reputable suppliers,
                     conducting thorough quality checks to guarantee your
                     satisfaction. Our dedication to delivering value extends
                     beyond just the price tag; it encompasses the freshness,
                     reliability, and trustworthiness you deserve.
                  </p>
               </div>
               <div className='col-span-12 my-4'>
                  <h1 className='text-2xl font-bold mb-3'>II. Our Team</h1>
                  <p>
                     Behind Hand Market's success is a talented and passionate
                     team dedicated to your shopping needs. Our customer-centric
                     approach is the foundation of our business. We're more than
                     just an e-commerce platform; we're your shopping partner.
                     Our team of knowledgeable and friendly professionals is
                     here to assist you every step of the way. From helping you
                     find the perfect product to ensuring smooth order
                     processing and swift delivery, we've got you covered. Your
                     satisfaction is our priority.
                  </p>
               </div>
               <div className='col-span-12 my-4'>
                  <h1 className='text-2xl font-bold mb-3'>
                     IV. Our Grattitude
                  </h1>
                  <p>
                     To our valued customers, we extend our heartfelt
                     appreciation for your trust and support. Hand Market
                     thrives because of you, and your satisfaction drives our
                     continuous improvement. We genuinely appreciate your
                     feedback, as it helps us refine our offerings and services.
                     We believe in fostering a strong and lasting relationship
                     with you, where your needs are heard and met. As we grow
                     together, we remain committed to serving you with
                     excellence, day after day. Thank you for choosing Hand
                     Market as your trusted shopping destination. We are excited
                     to embark on this journey with you and look forward to
                     being part of your everyday life.
                  </p>
               </div>
            </div>
         </div>
         <Footer />
      </>
   );
};

export default AboutUs;
