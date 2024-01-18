import React, { useEffect, useRef, useState } from 'react'
import axios from '@/axios'
import Header from '@/components/header'
import { CategoryType } from '@/types'
import { useRouter } from 'next/router'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { GetStaticProps, InferGetStaticPropsType } from 'next/types';
import Loading from '@/components/UI/Loading'
import Main from '@/components/main'
import { CartProvider } from '@/hoc/CartContext'



interface MyProps {
  data: CategoryType[] | null,
  error: string
}







export const getStaticProps: GetStaticProps<MyProps> = async () => {
  try {
    let myCafeId = process.env.NEXT_PUBLIC_MY_CAFE_ID;

    const { data } = await axios.get(`/cafe/${myCafeId}`)
    return {
      props: {
        data: data.categories,
        error: '',
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
        error: 'Error fetching data',
      },
    };
  }
};


export default function Index({ data, error }: InferGetStaticPropsType<typeof getStaticProps>) {
  const swiperRef = useRef<any>()
  const { locale } = useRouter()
  const [activeIndex, setActiveIndex] = useState(0);
  const [isNext, setPag] = useState(false)


  const goToNextSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
      setPag(false)
    }
  };

  useEffect(() => {
    if (isNext) {
      goToNextSlide()
      if (data && data?.length - 1 > activeIndex) {
        setActiveIndex(prev => prev + 1)
      } else if (data) {
        setActiveIndex(prev => 0)
      }
    }
  }, [isNext])



  return (
    <CartProvider>
      <div className='current-page w-full relative font-geo h-screen overflow-hidden page-slide'>
        <Header />
        <div className='sel-no w-full py-3 flex flex-col gap-4'>
          <Swiper
            ref={swiperRef}
            className='m-0'
            spaceBetween={10}
            slidesPerView={3}
            navigation
            loop
            speed={200}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            initialSlide={activeIndex}
          >
            {
              !(data && !error) ? <Loading /> : null
            }
            {data ? data.map((item: CategoryType, index) => (
              <SwiperSlide key={item._id}>
                <div className={`w-full flex justify-center `}>
                  <h1 onClick={() => setActiveIndex(index)} className={`${activeIndex == index ? 'text-primary' : 'text-white'}   overflow-hidden whitespace-nowrap overflow-ellipsis  cursor-pointer text-[20px]`}>{locale == 'ru' ? item.title ?? item.title_ky : item.title_ky ?? item.title}</h1>
                </div>
              </SwiperSlide>
            ))
              : null
            }
          </Swiper>
        </div>
        {
          data ? <Main cat={data[activeIndex]} setPagin={setPag} /> : null
        }
        {
          data == null && error == '' ? <div className='w-full min-h-[50vh] flex justify-center items-center'>
            <div className="grid min-h-[100px] w-full place-items-center rounded-lg p-4">
              <svg className="w-16 h-16 animate-spin text-primary" viewBox="0 0 64 64" fill="none"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path
                  d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                  stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path
                  d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                  stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900">
                </path>
              </svg>
            </div>
          </div> : null
        }
      </div >
    </CartProvider>

  )
}

