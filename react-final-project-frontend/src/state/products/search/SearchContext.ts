import React from 'react';
import { ISearchState } from './ISearchState';

export const initialSearchState : ISearchState = {
    searchName: "",
    redirect: false,
    setSearchName: () => {},
    setRiderect: () => {},
}

export const SearchContext = React.createContext<ISearchState>(initialSearchState);
export const SearchContextProvider = SearchContext.Provider;