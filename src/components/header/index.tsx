'use client'
import { useCart } from '@/hoc/CartContext'
import useDebounce from '@/hoc/useDebounced'
import { FoodsType } from '@/types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import axios from '@/axios'
import TextSpace from '../UI/TextSpace'
import ImageLoader from '../UI/ImageLoader'
import CartCounter from '../cart/CartCounter'
import Single_Page from '../popup/Single_Page'
const BASE_URL = process.env.NEXT_PUBLIC_MY_BASE_URL;

interface SearchDataProps {
    data: null | FoodsType[],
    loading: boolean
}

export default function Index() {
    const [{ loading, data }, setState] = useState<SearchDataProps>({
        data: null,
        loading: false
    })
    const { locale, asPath } = useRouter()
    const [changedItem, setChangeItem] = useState<FoodsType | null>(null)
    const { state, dispatch } = useCart()
    const [search, setSearch] = useState('')
    const debouncedValue = useDebounce(search, 500)
    const [focused, setFocused] = useState(false)

    useEffect(() => {
        if (!search) {
            setFocused(false)
            setState({ data: null, loading: false })
            return
        }
        setFocused(true)
        setState(prev => ({ ...prev, loading: true }))
        const MY_CAFE_ID = process.env.NEXT_PUBLIC_MY_CAFE_ID
        let response = axios.get(`/foods/${MY_CAFE_ID}?search=${search}`)
        response
            .then(res => setState({ data: res.data, loading: false }))
            .catch(() => setState({ data: null, loading: false }))
    }, [debouncedValue])




    return (
        <div className='w-full justify-center py-[17.5px] px-[16px] relative'>
            <nav className='w-full z-40 relative  flex justify-between gap-10'>
                <label className='flex border-b-2 items-center max-w-[210px]' htmlFor="search">
                    <svg className='w-4 h-4' width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.68736 5.37528C7.31803 5.37528 6.95231 5.44802 6.61109 5.58935C6.26987 5.73069 5.95984 5.93784 5.69868 6.19898C5.43752 6.46013 5.23036 6.77015 5.08903 7.11136C4.94769 7.45256 4.87494 7.81826 4.87494 8.18758C4.87494 8.55689 4.94769 8.9226 5.08903 9.2638C5.23036 9.605 5.43752 9.91503 5.69868 10.1762C5.95984 10.4373 6.26987 10.6445 6.61109 10.7858C6.95231 10.9271 7.31803 10.9999 7.68736 10.9999C8.43326 10.9999 9.1486 10.7036 9.67603 10.1762C10.2035 9.64877 10.4998 8.93345 10.4998 8.18758C10.4998 7.44171 10.2035 6.72639 9.67603 6.19898C9.1486 5.67158 8.43326 5.37528 7.68736 5.37528ZM3 8.18758C2.99994 7.4568 3.17075 6.73613 3.49881 6.08311C3.82687 5.4301 4.30308 4.86284 4.88941 4.42662C5.47575 3.99041 6.15596 3.69733 6.87573 3.5708C7.59551 3.44426 8.3349 3.48777 9.03486 3.69786C9.73482 3.90794 10.376 4.27877 10.9071 4.78074C11.4382 5.28271 11.8446 5.90191 12.0938 6.58889C12.343 7.27588 12.4281 8.01161 12.3423 8.73734C12.2565 9.46307 12.0022 10.1587 11.5997 10.7686L12.7272 11.9011C12.9026 12.0774 13.0007 12.3162 13 12.5649C12.9993 12.8136 12.8998 13.0519 12.7235 13.2272C12.5471 13.4026 12.3083 13.5007 12.0596 13.5C11.8109 13.4993 11.5726 13.3998 11.3972 13.2235L10.276 12.096C9.56964 12.564 8.74962 12.8317 7.90319 12.8707C7.05676 12.9097 6.21559 12.7186 5.46914 12.3176C4.7227 11.9166 4.09891 11.3208 3.66413 10.5936C3.22935 9.86636 2.99983 9.03487 3 8.18758Z" fill="#F49D37" />
                    </svg>
                    <input onChange={(e) => setSearch(e.target.value)} id='search' className='bg-transparent w-[190px] text-white outline-none' type="text" placeholder={`${locale == 'ru' ? 'Поиск' : 'Издөө'}`} />
                </label>
                <div className='flex items-center gap-4 sel-no'>
                    <Link href={'/cart'}>
                        {
                            state.length ?
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.74201 18.555C4.94201 20 7.17401 20 11.639 20H12.361C16.826 20 19.059 20 20.259 18.555M3.74201 18.555C2.54201 17.109 2.95401 14.915 3.77701 10.525C4.36201 7.405 4.65401 5.844 5.76501 4.922M20.259 18.555C21.459 17.109 21.047 14.915 20.224 10.525C19.639 7.405 19.346 5.844 18.235 4.922M18.235 4.922C17.125 4 15.536 4 12.361 4H11.639C8.46401 4 6.87601 4 5.76501 4.922" stroke="white" strokeWidth="1.5" />
                                    <path d="M9.17004 8C9.37665 8.58553 9.75978 9.09257 10.2666 9.45121C10.7735 9.80986 11.3791 10.0025 12 10.0025C12.621 10.0025 13.2266 9.80986 13.7334 9.45121C14.2403 9.09257 14.6234 8.58553 14.83 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                    <circle cx="19" cy="5" r="4.5" fill="#F49D37" stroke="black" />
                                </svg>
                                :
                                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.74201 15.555C2.94201 17 5.17401 17 9.63901 17H10.361C14.826 17 17.059 17 18.259 15.555M1.74201 15.555C0.542013 14.109 0.954013 11.915 1.77701 7.525C2.36201 4.405 2.65401 2.844 3.76501 1.922M18.259 15.555C19.459 14.109 19.047 11.915 18.224 7.525C17.639 4.405 17.346 2.844 16.235 1.922M16.235 1.922C15.125 1 13.536 1 10.361 1H9.63901C6.46401 1 4.87601 1 3.76501 1.922" stroke="white" strokeWidth="1.5" />
                                    <path d="M7.16998 5C7.37658 5.58553 7.75972 6.09257 8.26658 6.45121C8.77344 6.80986 9.37907 7.00245 9.99998 7.00245C10.6209 7.00245 11.2265 6.80986 11.7334 6.45121C12.2402 6.09257 12.6234 5.58553 12.83 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                        }

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
            </nav>
            <div className={`absolute ${focused ? 'search-active' : 'search-disactive'} w-full current-page bg-black bg-opacity-70 pt-14 left-0 top-0 flex justify-center h-screen overflow-auto z-20`}>
                <div className=' w-full rounded-xl flex items-center relative flex-col text-center'>
                    {changedItem ? <Single_Page item={changedItem} setClose={setChangeItem} /> : null}
                    {
                        loading ?
                            <div className='h-full w-full flex items-center justify-center'>
                                <div className="grid min-h-[100px] w-full place-items-center overflow-x-scroll rounded-lg p-4 lg:overflow-visible">
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
                            </div>
                            : null
                    }
                    {
                        (data !== null && data.length < 1 && loading == false) ?
                            <div className='h-full w-full flex items-center justify-center'>
                                <TextSpace classn='w-full text-center' line={true} text={locale == 'ru' ? 'Не удалось найти :(' : "Табылган жок :("} />
                            </div>
                            : null
                    }
                    <div className='flex flex-col w-full'>
                        {
                            data && data.length > 0 ?
                                data.map((item, index) => (
                                    <div key={item._id} className={`${!(index % 2) ? 'right-line ' : 'left-line'} relative w-full overflow-hidden flex `}>
                                        <div className='w-full cart-block justify-start my-5 flex px-4 relative gap-2 items-center'>
                                            <ImageLoader width={100} height={100} src={`${BASE_URL}${item.img}`} />
                                            <div className='w-full flex flex-col text-start justify-start items-start gap-1'>
                                                <h1 className='text-white text-[24px] pl-1 '>{locale == 'ru' ? item.title ?? item.title_ky : item.title_ky ?? item.title} </h1>
                                                <div className='flex items-center'>
                                                    <div className=''>
                                                        <button onClick={() => setChangeItem(item)} className='text-primary self-end mr-2 underline cursor-pointer'>{locale == 'ru' ? 'Подробно' : 'Маалымат'}</button>
                                                        <div className='flex flex-col'>
                                                            <div className='flex justify-between'>
                                                                <CartCounter classn={'flex-col pt-2 justify-start items-start px-0'} item={item} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))
                                : null
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}
