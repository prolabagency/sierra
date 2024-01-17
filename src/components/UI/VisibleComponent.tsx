import { CategoryType } from '@/types';
import React, { SetStateAction, useEffect, useRef } from 'react';

interface VisibleComponentProps {
    state: CategoryType,
    next: React.Dispatch<SetStateAction<any>>,
    main: HTMLDivElement | null
}

const VisibleComponent: React.FC<VisibleComponentProps> = ({ state, next, main }) => {
    const componentRef = useRef<HTMLDivElement | null>(null);

    const handleVisible = () => {
        if (componentRef.current) {
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
        console.log('asdsad');

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
                next(true);
            }, 500)
            return
        }


    };



    useEffect(() => {
        if (main && componentRef.current) {
            main.addEventListener('scroll', handleVisible);
            main.addEventListener('touchmove', handleVisible);
            return () => {
                main.removeEventListener('scroll', handleVisible);
                main.removeEventListener('touchmove', handleVisible);
            };
        }
    }, [state, main, next]);

    return (
        <div className='bottom-0 relative w-full'>
            <div className='min-h-[20px] w-full' ref={componentRef}>
                {/* Ваш контент */}
            </div>
        </div>
    );
};

export default VisibleComponent;
