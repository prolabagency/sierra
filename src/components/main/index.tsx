'use client'
import { CategoryType, FoodsType, SubcatType } from '@/types'
import React, { useEffect, useState } from 'react'
import axios from '@/axios'
import Loading from '../UI/Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useRouter } from 'next/router';
import TextSpace from '../UI/TextSpace';
import ImgLoader from '../UI/ImgLoader';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css/effect-coverflow';


interface Props {
    data: SubcatType[] | null,
    error: string,
    loading: boolean
}


export default function index({ cat }: { cat: CategoryType }) {
    const { locale } = useRouter()
    const [{ data, loading, error }, setData] = useState<Props>({
        data: null,
        error: '',
        loading: true
    })
    const [activedItem, setACtivedItem] = useState(0)

    useEffect(() => {
        if (cat) {
            axios.get(`/subcats/${cat._id}`)
                .then(res => setData(prev => ({ ...prev, data: res.data, loading: false })))
                .catch(err => setData(prev => ({ ...prev, error: err.response.data.error, loading: false })))
        }
    }, [cat])
    return (
        <div className='flex w-full h-[85vh]'>
            {
                loading ? <Loading /> : null
            }
            {
                (data && data.length > 0) ? <Swiper
                    className='m-0 w-full border-b-2'
                    slidesPerView={1}
                    direction='vertical'
                    speed={200}
                    scrollbar={{ draggable: true }}
                    onSlideChange={() => setACtivedItem(0)}
                >
                    {
                        !(data && !error) ? <Loading /> : null
                    }
                    {data && data.length > 0 ? data.map((item: SubcatType) => {
                        if (!item.value?.length) {
                            return null
                        }
                        return (
                            <div>
                                <SwiperSlide key={item._id}>
                                    <div className={`w-full h-full`}>
                                        <TextSpace text={locale == 'ru' ? item.title : item.title_ky ?? item.title} />
                                        <Swiper
                                            className='m-0 w-full'
                                            slidesPerView={1}
                                            centeredSlides
                                            initialSlide={0}
                                            modules={[EffectCoverflow, Pagination]}
                                            effect='coverflow'
                                            coverflowEffect={{
                                                rotate: 0,
                                                stretch: 150,
                                                depth: 200,
                                                modifier: 1,
                                                slideShadows: false,
                                                scale: .4,
                                            }}
                                            direction='horizontal'
                                            speed={400}
                                            scrollbar={{ draggable: true }}
                                            onSlideChange={(swiper) => setACtivedItem(swiper.activeIndex)}
                                        >
                                            {item.value.map((item: FoodsType, index) => {

                                                return (
                                                    <div>

                                                        <SwiperSlide className='h-full w-[80%] my-food-swiper min-w-[300px] ' key={item._id}>

                                                            <div className={`w-full h-full overflow-hidden flex justify-center items-center`}>
                                                                <div className='w-full'>
                                                                    {
                                                                        activedItem == index ?
                                                                            <h1 className='text-white text-[24px] mb-4 mt-4 text-center'>{locale == 'ru' ? item.title ?? item.title_ky : item.title_ky ?? item.title} </h1>
                                                                            : null
                                                                    }
                                                                    {/* <h1 className='text-white text-[24px] mb-4 mt-4 text-center'>{locale == 'ru' ? item.title ?? item.title_ky : item.title_ky ?? item.title} </h1> */}
                                                                    <div className='w-full justify-center items-center flex'>
                                                                        <ImgLoader src={`https://online-back-8jc6.onrender.com${item.img}`} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                    </div>

                                                )
                                            })
                                            }
                                        </Swiper>
                                    </div>
                                </SwiperSlide>
                            </div>


                        )
                    })
                        : null
                    }
                </Swiper> : null
            }
            {
                (!error && data?.length == 0) ?
                    <div className={`w-full px-4 relative m-0 overflow-hidden h-full flex justify-center items-center`}>
                        <TextSpace line={true} text={locale == 'ru' ? 'Ой а тут пусто :(' : "Ой бул жерде бош :("} />
                    </div>
                    : null
            }
        </div>
    )
}
