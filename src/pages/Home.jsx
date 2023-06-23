import React, { Suspense } from 'react';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import Category from '../components/Category';
import { Helmet } from 'react-helmet';
import { useOutletContext } from 'react-router-dom';

const Home = (props) => {
   const { navigate, dispatch } = useOutletContext();
 
   return (
      <>
         <Helmet>
            <meta charSet='utf-8' />
            <title> Home Page</title>
            <link
               rel='canonical'
               href='http://mysite.com/example'
            />
         </Helmet>
         <div className='w-100 banner bg-cover h-[300px] md:h-[500px] lg:h-[750px] mt-1'>
            <div className='w-1/4 md:w-2/4 flex flex-col justify-center height-inherit ml-10 md:ml-10'>
               <div className='w-4/4 md:w-2/4 mx-auto my-1 md:my-3 lg:my-5'>
                  <h1 className='text-2xl md:text-5xl lg:text-8xl font-semibold text-left text-color-blue my-5'>
                     Welcome to the Hand Market
                  </h1>
               </div>
               <div className='w-4/4 md:w-2/4 my-1 md:my-3 lg:my-5 mx-auto'>
                  <Button
                     size='sm'
                     className='button-yellow hover:shadow-md shadow-gray-400 px-0 md:px-5 md:py-2 lg:px-10'
                  >
                     <Link
                        to='/login'
                        className='text-[10px] md:text-lg font-semibold'
                     >
                        Get started
                     </Link>
                  </Button>
               </div>
            </div>
         </div>
         <Category />
      </>
   );
};

export default Home;
