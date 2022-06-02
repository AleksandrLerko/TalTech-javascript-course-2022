import React from 'react';
import { ISellerState } from './ISellerState';

// export const initialCurrencyState : ICurrency[] = []

export const initialSellerState : ISellerState = {
    sellers: [],
    setSellers: () => {}
}

export const SellerContext = React.createContext<ISellerState>(initialSellerState);
export const SellerContextProvider = SellerContext.Provider;