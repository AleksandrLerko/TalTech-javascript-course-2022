import React from 'react';
import { IJWTState } from './IJWTState';

// export const initialCurrencyState : ICurrency[] = []

export const jwtState : IJWTState = {
    jwtResponse: undefined,
    setJwtResponse: () => {}
}

export const JWTContext = React.createContext<IJWTState>(jwtState);
export const JWTContextProvider = JWTContext.Provider;