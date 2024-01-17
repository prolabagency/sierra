import { useRouter } from 'next/router'
import React, { SetStateAction, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import TextSpace from '../UI/TextSpace'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import { FoodsType, SubcatType } from '@/types'
import ImageLoader from '../UI/ImageLoader'
import CartCounter from '../cart/CartCounter'

export default function FoodBlock({ category, setChangeItem }: { category: SubcatType, setChangeItem: React.Dispatch<SetStateAction<FoodsType | null>> }) {
    const { locale } = useRouter()
    const [activedItem, setACtivedItem] = useState<FoodsType | undefined>(undefined)
    useEffect(() => {
        setACtivedItem(category.value[0])
    }, [category])
    return (
        <div className={`w-full h-screen flex flex-col mb-10`}>
            <div className='h-[80vh] flex flex-col justify-between'>
                <TextSpace classn='text-wrapped w-full' text={locale == 'ru' ? category.title || category.title_ky : category.title_ky || category.title} />
                {
                    activedItem ?
                        <h1 className='text-white text-[24px] mt-2 text-center'>{locale == 'ru' ? activedItem.title ?? activedItem.title_ky : activedItem.title_ky ?? activedItem.title} </h1>
                        : null
                }
                <Swiper
                    className='m-0 w-full flex justify-center items-center'
                    slidesPerView={1}
                    initialSlide={0}
                    centeredSlides
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
                    onSlideChange={(swiper) => {
                        setACtivedItem(category?.value ? category.value[swiper.activeIndex] : undefined)
                    }}
                >
                    {category.value.map((item: FoodsType, index) => {
                        return (
                            <SwiperSlide className='h-full w-full my-food-swiper min-w-[300px] myfood-swiper-slide' key={item._id}>
                                <div className={`w-full h-full flex justify-center items-center mb-4`}>
                                    <div className='w-full flex flex-col justify-center items-center gap-3'>
                                        <div className='w-full justify-center items-center flex h-full'>
                                            <ImageLoader width={250} height={250} src={`https://online-back-8jc6.onrender.com${item.img}`} />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                    }
                </Swiper>
                {
                    activedItem ? <div className='w-full min-h-40 on-line relative bottom-0 z-10'>
                        <div className='px-4 py-2'>
                            <div className='flex flex-col'>
                                <p className='text-white font-light food-desc'>{locale == 'ru' ? activedItem.desc || activedItem.desc_ky : activedItem.desc_ky || activedItem.desc}</p>
                                <button onClick={() => setChangeItem(activedItem)} className='text-primary self-end mr-2 underline cursor-pointer'>{locale == 'ru' ? 'Подробно' : 'Маалымат'}</button>
                            </div>
                            <div className='flex flex-col px-9 gap-5'>
                                <h1 className='text-white text-center font-extrabold'>{activedItem.size} / {activedItem.price}c</h1>
                                <div className='flex justify-between'>
                                    <CartCounter item={activedItem} />
                                </div>
                            </div>
                        </div>
                    </div>
                        : null
                }
            </div>

        </div>
    )
}
