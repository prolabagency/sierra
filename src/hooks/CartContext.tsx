import { FoodsType } from '@/types';
import React, { ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react';

// Создаем контекст
const CartContext = createContext<CartContextType | any>([]);

interface CartContextType {
    state: FoodsType[]; // Замените YourStateType на фактический тип вашего состояния
    dispatch: React.Dispatch<SetStateAction<FoodsType[]>>; // Тип dispatch для useState
}

// Компонент-поставщик, оборачивающий ваше приложение
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useState<FoodsType[]>([]);
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('cart') ?? '[]')
        dispatch(data)
    }, [])
    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);

    return context;
};
