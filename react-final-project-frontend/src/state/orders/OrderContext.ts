import React from 'react';
import { IOrderState } from './IOrderState';

export const initialOrderState : IOrderState = {
    orders: [],
    setOrder: () => {}
}

export const OrderContext = React.createContext<IOrderState>(initialOrderState);
export const OrderContextProvider = OrderContext.Provider;