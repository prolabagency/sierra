import { CategoryType } from '@/types';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';

interface VisibleComponentProps {
    state: CategoryType,
    next: React.Dispatch<SetStateAction<boolean>>,
    main: HTMLDivElement | null
}

const VisibleComponent: React.FC<VisibleComponentProps> = ({ state, next, main }) => {
    const componentRef = useRef<HTMLDivElement | null>(null);
    const [isScrolling, setScrolling] = useState(false)

    const handleVisible = () => {
        if (componentRef.current && !isScrolling) {
            setScrolling(true)
            return isVisible(componentRef.current);
        }
    };

    const isVisible = function (target: HTMLDivElement) {
        const targetPosition = target.getBoundingClientRect();
        const windowPosition = {
            top: 0,
            left: 0,
            right: document.documentElement.clientWidth,
            bottom: document.documentElement.clientHeight
        };
        if (
            targetPosition.bottom > windowPosition.top &&
            targetPosition.top < windowPosition.bottom &&
            targetPosition.right > windowPosition.left &&
            targetPosition.left < windowPosition.right
        ) {
            main?.scrollTo({ top: 0, behavior: 'smooth' });
            main?.removeEventListener('touchmove', handleVisible);
            main?.removeEventListener('scroll', handleVisible);
            setTimeout(() => {
                next(prev => prev == true ? false : true);
                setScrolling(false)
            }, 500)
            return
        }
    };



    useEffect(() => {
        if (main && componentRef.current) {
            main.scrollTo({ top: 0, behavior: 'smooth' })
            if (!isScrolling) {
                main.addEventListener('scroll', handleVisible);
                main.addEventListener('touchmove', handleVisible);
            }
            return () => {
                main.removeEventListener('scroll', handleVisible);
                main.removeEventListener('touchmove', handleVisible);
            };
        }
    }, [state, main, componentRef]);

    return (
        <div className='bottom-6 relative w-full'>
            <div className='min-h-[20px] w-full' ref={componentRef}>
            </div>
        </div>
    );
};

export default VisibleComponent;
