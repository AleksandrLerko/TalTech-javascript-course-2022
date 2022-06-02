import React from 'react';
import { IFuncState } from './IFuncState';

export const initialFuncState : IFuncState = {
    handleSubmit: () => {},
    handleChange: () => {}
}

export const FuncContext = React.createContext<IFuncState>(initialFuncState);
export const FuncContextProvider = FuncContext.Provider;