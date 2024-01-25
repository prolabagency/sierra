import { FoodsType } from '@/types';
import React, { ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext<CartContextType | any>([]);

interface CartContextType {
    state: FoodsType[]; 
    dispatch: React.Dispatch<SetStateAction<FoodsType[]>>; 
}

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
