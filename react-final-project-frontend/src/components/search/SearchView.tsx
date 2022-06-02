
import React from 'react';
import { FormEvent, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

export const RedirectContext = React.createContext(false);

const SearchView = () => {

    // States
    const [searchField, setSearchField] = useState("");
    let [redirect, setRedirect] = useState(false);

    // Handles
    const handleChange = (target: EventTarget & HTMLInputElement) => {
        setSearchField(target.value)
    }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(searchField)
        setRedirect(true);
        // setRedirect(false);
    }

    function searchList() {
        console.log("in search")
        // console.log(redirect)
        if (redirect === true) {
            console.log("after if")
            return (
                // <RedirectContext.Provider value={redirect}>
                <Navigate to="/productsbyname" state={searchField}></Navigate>
                // </RedirectContext.Provider>
            )
        }

        return null;
    }

    return (
        // <form className="w-100 me-3" onSubmit={(e) => props.handleSubmit(e)}>
        //     <input value={props.values.searchData} name="search" type="search" className="form-control" onChange={(e) => props.handleChange(e.target)} placeholder="Search..." aria-label="Search" />
        // </form>
        <>
            <form className="w-100 me-3" onSubmit={(e) => handleSubmit(e)}>
                <input
                    required
                    name="search"
                    type="search"
                    className="form-control"
                    placeholder="Search..."
                    aria-label="Search"
                    onChange={(e) => handleChange(e.target)} />
            </form>
            {
                searchList()
            }
        </>
    )

};

export default SearchView;