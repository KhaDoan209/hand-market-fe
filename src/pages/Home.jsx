import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Button } from 'flowbite-react';
import Category from '../components/Category';
import { useOutletContext } from 'react-router-dom';
import { getUserFromLocal } from '../utils/utils-functions';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import { getListCategoryAction } from '../redux/action/category-action';
import alterAvatar from '../assets/img/alter-ava.png';
import {
   getListProductAction,
   getListProductByDiscountAction,
   getListProductByPurchaseAction,
   getListProductByViewAction,
} from '../redux/action/product-action';
import ProductCard from '../components/ProductCard';
import { ProductType } from '../enums/ProductType';
import NextArrow from '../components/NextArrow';
import PrevArrow from '../components/PrevArrow';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getListNotificationAction } from '../redux/action/noti-action';
import { isMobile } from 'react-device-detect';
import { Admin, Shipper, User } from '../utils/variables';
import {
   Tabs,
   Tab,
   TabList,
   TabPanels,
   TabPanel,
   Link,
} from '@chakra-ui/react';
import {
   getListPendingDeliveryOrderAction,
   getListWaitingDoneOrderAction,
   getOrderInProgressAction,
} from '../redux/action/order-action';
import OrderCardShipper from '../components/OrderCardShipper';
import OrderInProgress from '../components/OrderInProgress';
import noodlesImg from '../assets/img/mi_tuong_den.jpg';
import sojuImg from '../assets/img/soju.png';
import Footer from '../components/Footer';
const Home = () => {
   const { navigate, dispatch } = useOutletContext();
   const userSignedIn = getUserFromLocal();
   const userDetail = useSelector((state) => state.authReducer.user_signed_in);
   const inProgressTabRef = useRef(null);
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
   const list_pending_delivery_order = useSelector(
      (state) => state.orderReducer.list_pending_delivery_order
   );
   const list_waiting_done = useSelector(
      (state) => state.orderReducer.list_waiting_done
   );
   const order_in_progress = useSelector(
      (state) => state.orderReducer.order_in_progress
   );
   const list_view = useSelector(
      (state) => state.productReducer.list_product_by_view
   );

   useEffect(() => {
      dispatch(getListProductByPurchaseAction());
      dispatch(getListProductByDiscountAction());
      dispatch(getListProductByViewAction());
      dispatch(getListProductAction());
      dispatch(getListCategoryAction());
      if (userSignedIn?.role === User || userSignedIn?.role === Admin) {
         dispatch(getListNotificationAction(userSignedIn?.id));
      } else if (userSignedIn?.role === Shipper) {
         dispatch(getListNotificationAction(userSignedIn?.id));
         dispatch(getOrderInProgressAction(userSignedIn?.id));
         dispatch(getListPendingDeliveryOrderAction());
         dispatch(getListWaitingDoneOrderAction(userSignedIn?.id));
      }
   }, []);

   return (
      <>
         {isMobile && userSignedIn?.role === Shipper ? (
            <>
               <div className='my-5 w-11/12 mx-auto'>
                  <div className='flex items-stretch'>
                     <img
                        src={
                           userDetail?.avatar ? userDetail?.avatar : alterAvatar
                        }
                        className='w-16 h-16 rounded-full object-cover'
                     />
                     <div className='mx-4'>
                        <div className='flex'>
                           <h1 className='text-xl font-bold cursor-pointer hover:text-opacity-90 text-[#374b73]'>
                              {userDetail?.first_name} {userDetail?.last_name}
                           </h1>
                           <p className='ml-1 text-sm'>🟢</p>
                        </div>
                        <h1 className='text-md font-normal cursor-pointer text-gray-400 '>
                           {userDetail?.email}
                        </h1>
                     </div>
                  </div>
               </div>
               <div className='w-full bg-gray-100'>
                  <Tabs>
                     <TabList>
                        <Tab>
                           <h1 className='text-[#374b73] font-bold'>
                              Freepick
                           </h1>
                        </Tab>
                        <Tab ref={inProgressTabRef}>
                           <h1 className='text-[#374b73] font-bold'>
                              In Progress
                           </h1>
                        </Tab>
                        <Tab>
                           <h1 className='text-[#374b73] font-bold'>Waiting</h1>
                        </Tab>
                     </TabList>
                     <TabPanels>
                        <TabPanel>
                           {list_pending_delivery_order?.map((item) => {
                              return (
                                 <div
                                    className='ovoverflow-hidden flex items-center'
                                    key={Math.random()}
                                 >
                                    <OrderCardShipper
                                       item={item}
                                       tab={inProgressTabRef}
                                    />
                                 </div>
                              );
                           })}
                        </TabPanel>
                        <TabPanel>
                           {order_in_progress !== null ? (
                              <>
                                 <OrderInProgress />
                              </>
                           ) : (
                              <h1 className='text-xl text-[#374b73] text-center font-bold'>
                                 You have no in-progress order
                              </h1>
                           )}
                        </TabPanel>
                        <TabPanel>
                           {list_waiting_done?.length > 0 ? (
                              <>
                                 {list_waiting_done?.map((item) => {
                                    return (
                                       <div
                                          className='ovoverflow-hidden flex items-center'
                                          key={Math.random()}
                                       >
                                          <OrderCardShipper
                                             item={item}
                                             tab={inProgressTabRef}
                                          />
                                       </div>
                                    );
                                 })}
                              </>
                           ) : (
                              <h1 className='text-xl text-[#374b73] text-center font-bold'>
                                 You have no waiting-done order
                              </h1>
                           )}
                        </TabPanel>
                     </TabPanels>
                  </Tabs>
               </div>
               <div className='h-[5rem]'></div>
            </>
         ) : (
            <>
               <div className='w-full banner bg-cover h-[300px] md:h-[500px] lg:h-[750px] mt-1'>
                  <div className='w-1/4 md:w-2/4 flex flex-col justify-center height-inherit ml-10 md:ml-10'>
                     <div className='w-4/4 md:w-2/4 lg:w-3/4 mx-auto my-1 md:my-3 lg:my-5'>
                        <h1 className='sm:text-2xl md:text-5xl lg:text-8xl font-semibold text-left text-color-blue my-5'>
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
               </div>
               <div className='w-11/12 m-0 md:w-3/4 mx-auto category mb-20 mt-10'>
                  <div className='flex mt-10 items-center'>
                     <span className='text-xl origin-center inline-block text-[#FFB4B4] font-bold transform vertical-text rotate-180 mx-2'>
                        Our products
                     </span>
                     <h2 className='text-3xl md:text-4xl lg:text-5xl mx-2 text-[#374b73] font-bold'>
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
               <div className='container w-11/12 md:w-3/4 mx-auto pb-5'>
                  <div className='my-10'>
                     <div className='flex my-10 items-center'>
                        <span className='text-md lg:text-xl origin-center inline-block text-[#FFB4B4] font-bold transform vertical-text rotate-180 mx-2'>
                           Recommendations
                        </span>
                        <h2 className='text-3xl lg:text-5xl mx-2 text-[#374b73] font-bold'>
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
                                       letter_length={14}
                                    />
                                 </div>
                              );
                           })}
                        </Slider>
                     </div>
                  </div>
                  <div className='my-10'>
                     <div className='flex my-10 items-center'>
                        <span className='text-md lg:text-xl origin-center inline-block text-[#FFB4B4] font-bold transform vertical-text rotate-180 mx-2'>
                           Promotions
                        </span>
                        <h2 className='text-3xl lg:text-5xl mx-2 text-[#374b73] font-bold'>
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
                                       letter_length={14}
                                    />
                                 </div>
                              );
                           })}
                        </Slider>
                     </div>
                  </div>
                  <div className='my-10'>
                     <div className='flex my-10 items-center'>
                        <span className='text-md lg:text-xl origin-center inline-block text-[#FFB4B4] font-bold transform vertical-text rotate-180 mx-2'>
                           Interesting
                        </span>
                        <h2 className='text-3xl lg:text-5xl mx-2 text-[#374b73] font-bold'>
                           Most views
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
                           {list_view?.data?.map((item) => {
                              return (
                                 <div
                                    className='px-3 my-5'
                                    key={Math.random()}
                                 >
                                    <ProductCard
                                       item={item}
                                       type={ProductType.view}
                                       letter_length={14}
                                    />
                                 </div>
                              );
                           })}
                        </Slider>
                     </div>
                  </div>
                  <div className='my-10'>
                     <div className='flex my-10 items-center'>
                        <span className='text-md lg:text-xl origin-center inline-block text-[#FFB4B4] font-bold transform vertical-text rotate-180 mx-2'>
                           Fun Facts
                        </span>
                        <h2 className='text-3xl lg:text-5xl mx-2 text-[#374b73] font-bold'>
                           New Articles
                        </h2>
                     </div>
                     <div className='mx-auto my-5 grid grid-cols-12 gap-5'>
                        <div className='col-span-12 lg:col-span-6'>
                           <img
                              src={noodlesImg}
                              className='w-full h-full rounded-md object-cover'
                           />
                        </div>
                        <div className='col-span-12 lg:col-span-6'>
                           <h1 className='text-3xl font-bold text-[#374b73] mb-5'>
                              MÌ TƯƠNG ĐEN HÀN QUỐC
                           </h1>
                           <p className='text-md font-semibold text-gray-500 text-justify'>
                              Mì tương đen Hàn Quốc, hay còn gọi là
                              "jajangmyeon," là một món ăn độc đáo và đầy hấp
                              dẫn trong ẩm thực Hàn Quốc. Nếu bạn bước vào một
                              quán ăn Hàn Quốc và thử mì tương đen, bạn sẽ bị
                              cuốn hút bởi vẻ ngoại hình độc đáo của nó. Sợi mì
                              trong mì tương đen được làm từ bột mỳ mềm mại, màu
                              đen đặc trưng do sự kết hợp tinh tế giữa mì và
                              mìn. Những sợi mì mềm mại này thường được nấu chín
                              và cảm nhận được sự dai dai độc đáo khi thưởng
                              thức.
                           </p>
                           <div className='w-full flex justify-end'>
                              <Link
                                 isExternal={true}
                                 href='https://bloganchoi.com/mi-tuong-den-nguoi-con-quoc-dan-cua-am-thuc-han-quoc-2/'
                              >
                                 <span className='text-blue-500 hover:underline'>
                                    View more
                                 </span>
                              </Link>
                           </div>
                        </div>
                        <div className='col-span-12 lg:col-span-6'>
                           <img
                              src={sojuImg}
                              className='w-full h-full rounded-md object-cover'
                           />
                        </div>
                        <div className='col-span-12 lg:col-span-6'>
                           <h1 className='text-3xl font-bold text-[#374b73] mb-5'>
                              RƯỢU SOJU HÀN QUỐC
                           </h1>
                           <p className='text-md font-semibold text-gray-500 text-justify'>
                              Nhắc đến ẩm thực Hàn Quốc, ngoài những món ăn ngon
                              và độc lạ thì chúng ta không thể bỏ qua rượu Soju
                              - là một loại rượu được đánh giá cao về hương vị
                              cũng như tính thẩm mĩ. Rượu Soju được xuất hiện
                              rất nhiều qua các bộ phim điện ảnh nên ngày càng
                              được bạn bè quốc tế ưa chuộng và cũng được ví như
                              linh hồn ẩm thực của xứ Đại Hàn. Soju không chỉ là
                              một loại đồ uống, mà còn là một phần của lối sống
                              và văn hóa của người Hàn Quốc.
                           </p>
                           <div className='w-full flex justify-end'>
                              <Link
                                 isExternal={true}
                                 href='https://mekonggourmet.com/tim-hieu-ve-ruou-soju-mekong-blog'
                              >
                                 <span className='text-blue-500 hover:underline'>
                                    View more
                                 </span>
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <Footer />
            </>
         )}
      </>
   );
};

export default Home;
