import { CategoryType } from '@/types';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';

interface VisibleComponentProps {
    state: CategoryType,
    next: React.Dispatch<SetStateAction<any>>,
    main: HTMLDivElement | null
}

const VisibleComponent: React.FC<VisibleComponentProps> = ({ state, next, main }) => {
    const componentRef = useRef<HTMLDivElement | null>(null);

    const handleVisible = () => {
        if (componentRef.current) {
            Visible(componentRef.current);
        }
    }
    const Visible = function (target: HTMLDivElement) {
        let targetPosition = {
            top: window.pageYOffset + target.getBoundingClientRect().top,
            left: window.pageXOffset + target.getBoundingClientRect().left,
            right: window.pageXOffset + target.getBoundingClientRect().right,
            bottom: window.pageYOffset + target.getBoundingClientRect().bottom
        },
            windowPosition = {
                top: window.pageYOffset,
                left: window.pageXOffset,
                right: window.pageXOffset + document.documentElement.clientWidth,
                bottom: window.pageYOffset + document.documentElement.clientHeight
            };

        if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
            targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
            targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
            targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
            next(true)
            return main?.removeEventListener('scroll', handleVisible)
        }

    };
    useEffect(() => {
        if (main) {
            setTimeout(() => {
                main.addEventListener('scroll', handleVisible);
            }, 1000)
        }
    }, [state])

    return (
        <div className='min-h-[150px] flex pt-[50px] w-full'>
            <div className='min-h-[60px] w-full' ref={componentRef}>
            </div>
        </div>
    );
};

export default VisibleComponent;
