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
import SlideNextButton from '@/hoc/IsNextSlide'




interface MyProps {
  data: CategoryType[] | null,
  error: string
}







export const getStaticProps: GetStaticProps<MyProps> = async () => {
  try {
    let myCafeId = process.env.MY_CAFE_ID;
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
  const [{ isNext, isPrev }, setPag] = useState({
    isNext: false,
    isPrev: false,
  })


  const goToNextSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
      setPag(prev => ({ isNext: false, isPrev: false }))
    }
  };


  const goToPrevSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
      setPag(prev => ({ isNext: false, isPrev: false }))
    }
  };

  if (isNext) {
    goToNextSlide()
    if (data && data?.length - 1 > activeIndex) {
      setActiveIndex(prev => prev + 1)
    } else if (data) {
      setActiveIndex(prev => 0)
    }
  }

  if (isPrev) {
    goToPrevSlide()
    if (data && activeIndex > 0) {
      setActiveIndex(prev => prev - 1)
    } else if (data) {
      setActiveIndex(prev => data.length - 1)
    }
  }


  return (
    <CartProvider>
      <div className='current-page w-full relative font-geo page-slide'>
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

      </div >
    </CartProvider>

  )
}

