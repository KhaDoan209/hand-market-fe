import React, { Fragment, useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import Category from '../components/Category';
import { NavLink, useOutletContext } from 'react-router-dom';
import { getUserFromLocal } from '../utils/utils-functions';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import { getListCategoryAction } from '../redux/action/category-action';
import {
   getListProductByDiscountAction,
   getListProductByPurchaseAction,
} from '../redux/action/product-action';
import ProductCard from '../components/ProductCard';
import { ProductType } from '../enums/ProductType';
import NextArrow from '../components/NextArrow';
import PrevArrow from '../components/PrevArrow';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getItemCartByUserAction } from '../redux/action/cart-action';
import { getListProductAction } from '../redux/action/product-action';

const Home = (props) => {
   const { navigate, dispatch } = useOutletContext();
   const userSignedIn = getUserFromLocal();
   const settings = {
      dots: true,
      infinite: true,
      speed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      pauseOnHover: true,
      swiper: true,
   };
   const list_category = useSelector(
      (state) => state.categoryReducer.list_category
   );
   const list_recommendation = useSelector(
      (state) => state.productReducer.list_product_by_purchase
   );
   const list_discount = useSelector(
      (state) => state.productReducer.list_product_by_discount
   );
   useEffect(() => {
      // let apiCalling = setInterval(() => {
      dispatch(getListProductByPurchaseAction());
      dispatch(getListCategoryAction());
      dispatch(getListProductByDiscountAction());
      //    }, 1000);
      //    return () => {
      //       clearInterval(apiCalling);
      //    };
   }, []);
   return (
      <>
         <div className='w-100 banner bg-cover h-[300px] md:h-[500px] lg:h-[750px] mt-1'>
            <div className='w-1/4 md:w-2/4 flex flex-col justify-center height-inherit ml-10 md:ml-10'>
               <div className='w-4/4 md:w-2/4 lg:w-3/4 mx-auto my-1 md:my-3 lg:my-5'>
                  <h1 className='text-2xl md:text-5xl lg:text-8xl font-semibold text-left text-color-blue my-5'>
                     Welcome to the Hand Market
                  </h1>
               </div>
               <div className='w-4/4 md:w-2/4 lg:w-3/4 my-1 md:my-3 lg:my-5 mx-auto'>
                  <Button
                     onClick={() => {
                        if (!userSignedIn) {
                           navigate('/login');
                        } else {
                           navigate('/user/view-product');
                        }
                     }}
                     size='sm'
                     className='button-yellow hover:shadow-md shadow-gray-400 px-0 md:px-5 md:py-2 lg:px-10'
                  >
                     <p className='text-[10px] md:text-lg font-semibold'>
                        Buy now
                     </p>
                  </Button>
               </div>
            </div>
            <div className='w-3/4 mx-auto category mb-20 mt-10'>
               <div className='flex mt-10 items-center'>
                  <span className='text-xl origin-center inline-block text-[#FFB4B4] font-bold transform vertical-text rotate-180 mx-2'>
                     Our products
                  </span>
                  <h2 className='text-5xl mx-2 text-[#374b73] font-bold'>
                     Fresh ingredients everyday
                  </h2>
               </div>
               <Slider {...settings}>
                  {list_category?.map((item) => {
                     return (
                        <Fragment key={Math.random()}>
                           <Category item={item} />
                        </Fragment>
                     );
                  })}
               </Slider>
            </div>
            <div className='container w-3/4 mx-auto'>
               <div className='my-10'>
                  <div className='flex my-10 items-center'>
                     <span className='text-xl origin-center inline-block text-[#FFB4B4] font-bold transform vertical-text rotate-180 mx-2'>
                        Recommendations
                     </span>
                     <h2 className='text-5xl mx-2 text-[#374b73] font-bold'>
                        Daily Suggestions
                     </h2>
                  </div>
                  <div className='mx-auto my-5'>
                     <Slider
                        responsive={[
                           {
                              breakpoint: 1024,
                              settings: {
                                 slidesToShow: 3,
                                 slidesToScroll: 3,
                                 infinite: true,
                              },
                           },
                           {
                              breakpoint: 600,
                              settings: {
                                 slidesToShow: 2,
                                 slidesToScroll: 2,
                                 initialSlide: 2,
                              },
                           },
                           {
                              breakpoint: 480,
                              settings: {
                                 slidesToShow: 1,
                                 slidesToScroll: 1,
                              },
                           },
                        ]}
                        infinite={true}
                        speed={2000}
                        slidesToShow={4}
                        slidesToScroll={3}
                        autoplay={true}
                        pauseOnHover={true}
                        swiper={true}
                        nextArrow={<NextArrow />}
                        prevArrow={<PrevArrow />}
                     >
                        {list_recommendation?.data?.map((item) => {
                           return (
                              <div
                                 className='px-3 my-5'
                                 key={Math.random()}
                              >
                                 <ProductCard
                                    item={item}
                                    type={ProductType.purchase}
                                    letter_length={17}
                                 />
                              </div>
                           );
                        })}
                     </Slider>
                  </div>
               </div>
               <div className='my-10'>
                  <div className='flex my-10 items-center'>
                     <span className='text-xl origin-center inline-block text-[#FFB4B4] font-bold transform vertical-text rotate-180 mx-2'>
                        Promotions
                     </span>
                     <h2 className='text-5xl mx-2 text-[#374b73] font-bold'>
                        Hot deals
                     </h2>
                  </div>
                  <div className='mx-auto my-5'>
                     <Slider
                        responsive={[
                           {
                              breakpoint: 1024,
                              settings: {
                                 slidesToShow: 3,
                                 slidesToScroll: 3,
                                 infinite: true,
                              },
                           },
                           {
                              breakpoint: 600,
                              settings: {
                                 slidesToShow: 2,
                                 slidesToScroll: 2,
                                 initialSlide: 2,
                              },
                           },
                           {
                              breakpoint: 480,
                              settings: {
                                 slidesToShow: 1,
                                 slidesToScroll: 1,
                              },
                           },
                        ]}
                        infinite={true}
                        speed={2000}
                        slidesToShow={4}
                        slidesToScroll={3}
                        autoplay={true}
                        pauseOnHover={true}
                        swiper={true}
                        nextArrow={<NextArrow />}
                        prevArrow={<PrevArrow />}
                     >
                        {list_discount?.data?.map((item) => {
                           return (
                              <div
                                 className='px-3 my-5'
                                 key={Math.random()}
                              >
                                 <ProductCard
                                    item={item}
                                    type={ProductType.discount}
                                    letter_length={17}
                                 />
                              </div>
                           );
                        })}
                     </Slider>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Home;
