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
            isVisible(componentRef.current);
        }
    };
    const scrollHandler = () => handleVisible();
    const isVisible = function (target: HTMLDivElement) {

        // let targetPosition = {
        //     top: window.pageYOffset + target.getBoundingClientRect().top,
        //     left: window.pageXOffset + target.getBoundingClientRect().left,
        //     right: window.pageXOffset + target.getBoundingClientRect().right,
        //     bottom: window.pageYOffset + target.getBoundingClientRect().bottom
        // };

        // let windowPosition = {
        //     top: window.pageYOffset,
        //     left: window.pageXOffset,
        //     right: window.pageXOffset + document.documentElement.clientWidth,
        //     bottom: window.pageYOffset + document.documentElement.clientHeight
        // };
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
            main?.removeEventListener('touchmove', scrollHandler);
            main?.removeEventListener('scroll', handleVisible);
            next(true);
            return
        }


    };

    useEffect(() => {
        if (main) {
            main.addEventListener('scroll', scrollHandler);
            main.addEventListener('touchmove', scrollHandler);
            return () => {
                main.removeEventListener('scroll', scrollHandler);
                main.removeEventListener('touchmove', scrollHandler);
            };
        }
    }, [state]);

    return (
        <div className='bottom-0 relative w-full'>
            <div className='min-h-[20px] w-full' ref={componentRef}>
                {/* Ваш контент */}
            </div>
        </div>
    );
};

export default VisibleComponent;
