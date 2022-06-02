import React from 'react';
import { ICurrencyState } from './ICurrencyState';

// export const initialCurrencyState : ICurrency[] = []

export const initialCurrencyState : ICurrencyState = {
    currencyName: "Euro",
    setCurrencyName: () => {}
}

export const CurrencyContext = React.createContext<ICurrencyState>(initialCurrencyState);
export const CurrencyContextProvider = CurrencyContext.Provider;