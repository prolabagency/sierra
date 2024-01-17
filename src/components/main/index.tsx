'use client'
import { CategoryType, FoodsType, SubcatType } from '@/types'
import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import axios from '@/axios'
import Loading from '../UI/Loading';
import 'swiper/css';
import { useRouter } from 'next/router';
import TextSpace from '../UI/TextSpace';
import 'swiper/css/effect-coverflow';
import Single_Page from '../popup/Single_Page';
import FoodBlock from './FoodBlock';
import VisibleComponent from '../UI/VisibleComponent';

interface Props {
    data: SubcatType[] | null,
    error: string,
    loading?: boolean
}


export default function Index({ cat, setPagin }: { cat: CategoryType, setPagin: React.Dispatch<SetStateAction<boolean>>, }) {
    const mainRef = useRef<HTMLDivElement | null>(null)

    const { locale } = useRouter()
    const [{ data, loading }, setData] = useState<Props>({
        data: null,
        error: '',
        loading: true
    })
    const [changedItem, setChangeItem] = useState<FoodsType | null>(null)
    useEffect(() => {
        if (cat) {
            axios.get(`/subcats/${cat._id}`)
                .then((res) => {
                    setData(prev => ({ data: res.data, loading: false, error: '' }))
                })
                .catch((err) => setData(prev => ({ ...prev, error: err?.response?.data.error ?? "Ошибка при получении", loading: false })))
        }
    }, [cat])
    return (
        <div ref={mainRef} className='flex w-full flex-col h-full overflow-auto main-container pb-20'>
            {
                changedItem ? <Single_Page item={changedItem} setClose={setChangeItem} /> : null
            }
            {
                loading ? <Loading /> : null
            }
            {
                (data && data.length > 0) ?
                    <div>
                        {data && data.length > 0 ? data.map((item: SubcatType) => {
                            if (!item.value?.length) {
                                return null
                            }
                            return (
                                <FoodBlock key={item._id} category={item} setChangeItem={setChangeItem} />
                            )
                        })
                            : null
                        }
                    </div> : null
            }

            {
                (data?.length == 0) ?
                    <div className={`w-full px-4 relative m-0 overflow-hidden h-full flex justify-center items-center page-slide`}>
                        <TextSpace line={true} text={locale == 'ru' ? 'Ой а тут пусто :(' : "Ой бул жерде бош :("} />
                    </div>
                    : null
            }
            <VisibleComponent main={mainRef.current} state={cat} next={setPagin} />
        </div >
    )
}
