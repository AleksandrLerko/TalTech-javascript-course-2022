import React from 'react';
import { ICartState } from './ICartState';

// export const initialCurrencyState : ICurrency[] = []

export const initialCartState : ICartState = {
    products: [],
    setProducts: () => {},
    deleteProduct: () => {}
}

export const CartContext = React.createContext<ICartState>(initialCartState);
export const CartContextProvider = CartContext.Provider;