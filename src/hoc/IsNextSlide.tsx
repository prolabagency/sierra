import { SetStateAction } from 'react';
import { useSwiper } from 'swiper/react';

export default function SlideNextButton({ state, setPag }: { state: boolean, setPag: React.Dispatch<SetStateAction<{ isPrev: boolean, isNext: boolean }>> }) {
    const swiper = useSwiper();
    if (state) {
        swiper.slideNext()
        setPag(prev => ({ isNext: false, isPrev: false }))
        return
    }
    return (
        <></>
    )
}