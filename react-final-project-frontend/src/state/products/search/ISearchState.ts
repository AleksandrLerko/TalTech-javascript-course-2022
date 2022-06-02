import { FormEvent } from "react";

export interface ISearchState {
    searchName: string,
    redirect: boolean,
    setSearchName: (searchName: string) => void,
    setRiderect: (redirect: boolean) => void
}