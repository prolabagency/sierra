import { useCart } from '@/hoc/CartContext'
import { FoodsType } from '@/types'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import TextSpace from '../UI/TextSpace'
import Link from 'next/link'
import ImageLoader from '../UI/ImageLoader'
const BASE_URL = process.env.NEXT_PUBLIC_MY_BASE_URL;


export default function Layout() {
    const { state, dispatch } = useCart()
    const { locale } = useRouter()
    const handlePlus = (item: FoodsType) => {
        let data = state.map((el: FoodsType) => el._id == item._id ? { ...el, count: el.count + 1 } : el)
        localStorage.setItem('cart', JSON.stringify(data))
        dispatch(data)

    }
    const handleMinus = (item: FoodsType) => {
        if (item.count > 1) {
            let data = state.map((el: FoodsType) => el._id == item._id ? { ...el, count: el.count - 1 } : el)
            localStorage.setItem('cart', JSON.stringify(data))
            dispatch(data)
        }
    }

    const handleDelete = (item: FoodsType) => {
        let data = state.filter((el: FoodsType) => el._id != item._id)
        localStorage.setItem('cart', JSON.stringify(data))
        dispatch(data)
    }
    console.log(state);
    return (
        <div className='w-full sel-no flex flex-col pt-8 h-[75vh] overflow-y-auto overflow-x-hidden'>
            {
                state.length ? <div className='w-full absolute bottom-12 flex justify-center'>
                    <button onClick={() => {
                        dispatch([])
                        localStorage.setItem('cart', '[]')
                    }} className='bg-white rounded-sm px-3 py-1 text-[20px]'>
                        {locale == 'ru' ? 'Очистить' : 'Бошотуу'}
                    </button>
                </div> : null
            }
            {
                state.length ? state.map((item: FoodsType, index: number) => (
                    <div key={item._id} className={`${!(index % 2) ? 'right-line' : 'left-line'} relative w-full flex `}>
                        <div className='w-full cart-block justify-start my-5 flex px-4 relative gap-2 items-center'>
                            <button onClick={() => handleDelete(item)} className='absolute top-0 right-5'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#DE9393" strokeWidth="1.5" />
                                    <path d="M14.5 9.5L9.5 14.5M9.5 9.5L14.5 14.5" stroke="#DE9393" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>
                            <ImageLoader width={100} height={100} src={`${BASE_URL}${item.img}`} />
                            <div className='w-full flex flex-col justify-start gap-1'>
                                <h1 className='text-white text-[24px] pl-1 '>{locale == 'ru' ? item.title ?? item.title_ky : item.title_ky ?? item.title} </h1>
                                <div className='flex items-center'>
                                    <div className='text-white text-[20px] flex gap-1 items-center font-extrabold'>
                                        <button className='w-5 h-5' onClick={() => handleMinus(item)}>
                                            <Image className='text-white ' height={20} width={20} src="/vectors/arrow.png" alt="-" />
                                        </button>
                                        {item.count}
                                        <button className='w-5 h-5' onClick={() => handlePlus(item)}>
                                            <Image className='text-white rotate-180' height={20} width={20} src="/vectors/arrow.png" alt="+" />
                                        </button>
                                    </div>
                                    <h1 className='text-white ml-1 text-[16px]'>{locale == 'ru' ? 'Порции' : 'Ченем'}</h1>
                                </div>

                            </div>
                        </div>
                    </div>
                ))

                    : <div className='w-full h-full flex flex-col items-center justify-center'>
                        <div className='max-w-[205px] text-center'>
                            <TextSpace line={true} text={locale == 'ru' ? 'Ой а тут пусто :(' : "Ой бул жерде бош :("} />
                            <p className='text-[16px] mt-1 text-white font-[250] leading-[19.2px]'>{locale == 'ru' ? 'Давайте выберем щось смачненьке' : 'Даамдуу бир нерсе тандайлы'}</p>
                        </div>
                        <Link href={'/'} locale={locale} className='bg-white mt-8 rounded-sm text-[20px] px-3 py-1'>
                            {locale == 'ru' ? 'Смачненьке' : 'Смачненка'}
                        </Link>
                    </div>
            }
        </div>
    )
}
