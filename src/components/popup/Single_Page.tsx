import { FoodsType } from '@/types'
import { useRouter } from 'next/router'
import React, { SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image'
import TextSpace from '../UI/TextSpace'
import { useCart } from '@/hooks/CartContext'

export default function Single_Page({ item, setClose }: { item: FoodsType, setClose: React.Dispatch<SetStateAction<FoodsType | null>> }) {
    const { state, dispatch } = useCart()
    const [isCart, setCart] = useState(false)
    const { locale } = useRouter()
    useEffect(() => {
        let myFood = state.find((el: FoodsType) => el._id == item._id)
        if (myFood) {
            setCart(true)
        }
    }, [])
    const handleAdd = () => {
        if (isCart) {
            let newData = state.filter((el: FoodsType) => el._id != item._id)
            localStorage.setItem('cart', JSON.stringify(newData))
            setCart(false)
            dispatch(newData)
        } else {
            let newData = [{ ...item, count: 1 }, ...state]
            localStorage.setItem('cart', JSON.stringify(newData))
            setCart(true)
            dispatch(newData)
        }
    }
    const recipe = locale == 'ru' ? item.recipe : item.recipe_ky
    return (
        <div className='absolute left-0 top-0 z-30 w-full h-screen flex justify-center items-center popup-modal pt-5'>
            <div className='relative w-full h-screen'>
                <button className='absolute top-3 right-4 z-40' onClick={() => setClose(null)}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 25.6667C20.4434 25.6667 25.6667 20.4434 25.6667 14C25.6667 7.55672 20.4434 2.33337 14 2.33337C7.55672 2.33337 2.33337 7.55672 2.33337 14C2.33337 20.4434 7.55672 25.6667 14 25.6667Z" stroke="white" strokeWidth="2" />
                        <path d="M16.9167 11.0834L11.0834 16.9167M11.0834 11.0834L16.9167 16.9167" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
                <div className='pt-10 w-full flex flex-col h-full items-center'>
                    <TextSpace line={true} text={locale == 'ru' ? item.title || item.title_ky : item.title_ky || item.title} />
                    <Image width={250} height={250} src={`https://online-back-8jc6.onrender.com${item.img}`} alt="Img" />
                    <div className='w-full px-9 text-white text-[16px] leading-[19.2px]  overflow-auto h-full'>
                        <p className='pb-2'>{locale == 'ru' ? 'Описание:' : 'Маалымат:'}</p>
                        <p className='text-white font-light  pl-[6px] pb-4'>{locale == 'ru' ? item.desc || item.desc_ky : item.desc_ky || item.desc}</p>
                        <p className=''>{locale == 'ru' ? 'Состав:' : 'Курамы:'}</p>
                        <ul className='pl-[6px] pt-2'>
                            {
                                recipe.map(item => (
                                    <li key={item}>- {item}</li>
                                ))
                            }
                        </ul>
                        <button onClick={handleAdd} className='text-primary mx-auto mt-6 flex border border-primary rounded-md px-8 py-3 gap-2'>{locale == 'ru' ? 'Добавить' : 'Тандоо'}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className={`${isCart ? 'fill-primary' : 'fill-transparent'} stroke-primary`} d="M9.15299 5.408C10.42 3.136 11.053 2 12 2C12.947 2 13.58 3.136 14.847 5.408L15.175 5.996C15.535 6.642 15.715 6.965 15.995 7.178C16.275 7.391 16.625 7.47 17.325 7.628L17.961 7.772C20.421 8.329 21.65 8.607 21.943 9.548C22.235 10.488 21.397 11.469 19.72 13.43L19.286 13.937C18.81 14.494 18.571 14.773 18.464 15.117C18.357 15.462 18.393 15.834 18.465 16.577L18.531 17.254C18.784 19.871 18.911 21.179 18.145 21.76C17.379 22.342 16.227 21.811 13.925 20.751L13.328 20.477C12.674 20.175 12.347 20.025 12 20.025C11.653 20.025 11.326 20.175 10.671 20.477L10.076 20.751C7.77299 21.811 6.62099 22.341 5.85599 21.761C5.08899 21.179 5.21599 19.871 5.46899 17.254L5.53499 16.578C5.60699 15.834 5.64299 15.462 5.53499 15.118C5.42899 14.773 5.18999 14.494 4.71399 13.938L4.27999 13.43C2.60299 11.47 1.76499 10.489 2.05699 9.548C2.34999 8.607 3.57999 8.328 6.03999 7.772L6.67599 7.628C7.37499 7.47 7.72399 7.391 8.00499 7.178C8.28499 6.965 8.46499 6.642 8.82499 5.996L9.15299 5.408Z" fill="currentColor" />
                            </svg>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}
