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

    const isVisible = function (target: HTMLDivElement) {
        let targetPosition = {
            top: window.pageYOffset + target.getBoundingClientRect().top,
            left: window.pageXOffset + target.getBoundingClientRect().left,
            right: window.pageXOffset + target.getBoundingClientRect().right,
            bottom: window.pageYOffset + target.getBoundingClientRect().bottom
        };

        let windowPosition = {
            top: window.pageYOffset,
            left: window.pageXOffset,
            right: window.pageXOffset + document.documentElement.clientWidth,
            bottom: window.pageYOffset + document.documentElement.clientHeight
        };

        if (
            targetPosition.bottom > windowPosition.top &&
            targetPosition.top < windowPosition.bottom &&
            targetPosition.right > windowPosition.left &&
            targetPosition.left < windowPosition.right
        ) {
            next(true);
            return main?.removeEventListener('scroll', handleVisible);
        }
    };

    useEffect(() => {
        const scrollHandler = () => handleVisible();
        if (main) {
            setTimeout(() => {
                main.addEventListener('scroll', scrollHandler);
                main.addEventListener('touchmove', scrollHandler); // Добавить обработчик для события touchmove
            }, 1000);

            return () => {
                main.removeEventListener('scroll', scrollHandler);
                main.removeEventListener('touchmove', scrollHandler); // Удалить обработчик для события touchmove
            };
        }
    }, [state, main]);

    return (
        <div className='min-h-[150px] flex pt-[50px] w-full'>
            <div className='min-h-[60px] w-full' ref={componentRef}>
                {/* Ваш контент */}
            </div>
        </div>
    );
};

export default VisibleComponent;
