import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { Link, Navigate, NavLink } from 'react-router-dom';
import { ICurrency } from '../domain/ICurrency';
import { IJWTResponse } from '../domain/IJWTResponse';
import { IServiceResult } from '../domain/IServiceResult';
import { CurrencyService } from '../services/CurrencyService';
import { CartContext } from '../state/cart/CartContext';
import { CurrencyContext } from '../state/currencies/CurrencyContext';
import { JWTContext } from '../state/identities/JWTContext';
import { OrderContext } from '../state/orders/OrderContext';
import { FuncContext } from '../state/products/search/FuncContext';
import { SearchContext } from '../state/products/search/SearchContext';
import SearchView from './search/SearchView';

let initialCurrencyState: IServiceResult<ICurrency[]>;

const Header = () => {

    const [redirect, setRedirect] = useState(false);

    const currencyService = new CurrencyService();

    const [currencyState, setCurrencyState] = useState(initialCurrencyState);

    // const [searchState, setSearchState] = useState({
    //     searchData: ""
    // });

    let searchContext = useContext(SearchContext);
    let funcContext = useContext(FuncContext);

    let currencyContext = useContext(CurrencyContext);

    let identityState = useContext(JWTContext);

    let cartContext = useContext(CartContext);

    useEffect(() => {
        currencyService.getAll().then(data => setCurrencyState(data));
        // console.log(currencyState)
    }, [])

    // function handleSubmit(e: FormEvent) {
    //     setRedirect(false)
    //     e.preventDefault();
    //     console.log(searchContext.searchName)
    //     // searchContext.setSearchName(searchState.searchData)
    //     // setSearchState("");
    //     setRedirect(true);
    //     // console.log()
    // }


    // function handleChange(target: EventTarget & HTMLInputElement) {
    //     let searchData = target.value;
    //     setSearchState({...searchState, searchData})
    // }

    // function renderElement() {
    //     if (searchContext.redirect === true) {
    //         searchContext.redirect = false;
    //         return <Navigate to="/productsbyname"></Navigate>;
    //     }
    //     return null;
    // }

    if (!currencyState) {
        return null;
    }
    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow m3">
                <div className="container container-fluid">
                    <Link className="navbar-brand" to="/">OSS</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">
                            <li className="navbar-brand">
                                <select className="btn dropdown-toggle stripped" onChange={(e) => currencyContext.setCurrencyName(e.target.value)} name="currency" id="curr">
                                    {currencyState.data!.map(item => {
                                        return (
                                            <option key={item.id} value={item.currencyName}>{item.currencyName}</option>
                                        );
                                    })}
                                </select>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <>
                                <li className="navbar-brand">
                                    <Link to="/cart" style={{ color: "black" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                        </svg>
                                    </Link>
                                </li>
                                {/* <li className="navbar-brand">
                                        ({cartContext.products.length})
                                    </li> */}
                            </>
                            <>{identityState.jwtResponse === undefined ? (
                                <>
                                    <li className="navbar-brand">
                                        <Link className="btn btn-primary" to="/register">Register</Link>
                                    </li>
                                    <li className="navbar-brand">
                                        <Link className="btn btn-success" to="/login">Login</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    {/* <li className="nav-item">{identityState.jwtResponse?.email}</li> */}
                                    <li className="navbar-brand">
                                        <Link className="btn btn-primary registerButton" to="/account">My account</Link>
                                    </li>
                                    <li className="navbar-brand">
                                        <Link className="btn btn-info" to="/logout">Logout</Link>
                                    </li>
                                </>
                            )}</>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* {searchContext.redirect === true &&
                <Navigate to="/productsbyname"></Navigate>
            } */}
        </header>
    );
}

export default Header;