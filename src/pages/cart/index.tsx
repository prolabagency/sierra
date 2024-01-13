import { CartProvider } from '@/hoc/CartContext'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Layout from '@/components/cart/Layout'
export default function Index() {
    const { locale, asPath } = useRouter()
    return (
        <div className='w-full h-screen font-geo page-slide '>
            <div className='w-full flex justify-between items-center sel-no px-4 py-5'>
                <Link locale={locale} href={'/'} className='text-white text-[20px] sel-no flex items-center'>
                    <svg className='sel-no' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 5L9 12L15 19" stroke="#EDEDED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {locale == 'ru' ? 'Назад' : 'Артка'}
                </Link>
                <div className='flex text-white gap-2 text-[14px]'>
                    <Link href={asPath} locale='ru' className={`hover:text-primary ${locale == 'ru' ? 'text-primary' : ''}`}>
                        Ру
                    </Link>
                    /
                    <Link href={asPath} locale='kg' className={`hover:text-primary  ${locale == 'kg' ? 'text-primary' : ''}`}>
                        Кг
                    </Link>
                </div>
            </div>
            <CartProvider>
                <Layout />
            </CartProvider>
        </div>
    )
}
