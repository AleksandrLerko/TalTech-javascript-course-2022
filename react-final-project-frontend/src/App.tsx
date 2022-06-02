import React, { FormEvent, ReactElement, useContext, useEffect, useState } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Page404 from './components/Page404';
import Home from './components/Home';
import CategoryIndex from './components/category/CategoryIndex';
import ProductsByCategory from './components/product/ProductsByCategory';
import { CurrencyService } from './services/CurrencyService';
import { SellerService } from './services/SellerService';
import { initialSellerState, SellerContextProvider } from './state/sellers/SellerContext';
import { ISeller } from './domain/ISeller';
import Login from './components/identity/Login/Login';
import { CurrencyContextProvider, initialCurrencyState } from './state/currencies/CurrencyContext';
import { JWTContext, JWTContextProvider, jwtState } from './state/identities/JWTContext';
import { IJWTResponse } from './domain/IJWTResponse';
import Logout from './components/identity/Logout/Logout';
import ProductsByName from './components/product/ProductsByName';
import { initialSearchState, SearchContext, SearchContextProvider } from './state/products/search/SearchContext';
import { JsxElement } from 'typescript';
import { FuncContextProvider, initialFuncState } from './state/products/search/FuncContext';
import Register from './components/identity/Register/Register';
import ProductUnit from './components/product/unit/ProductUnit';
import CartIndex from './components/cart/CartIndex';
import { initialOrderState, OrderContextProvider } from './state/orders/OrderContext';
import { IOrder } from './domain/IOrder';
import { CartContextProvider, initialCartState } from './state/cart/CartContext';
import { IProduct } from './domain/IProduct';
import PaymentIndex from './components/payment/PaymentIndex';
import AccountIndex from './components/identity/Account/AccountIndex';
import InvoiceIndex from './components/invoice/InvoiceIndex';
import { IProductValid } from './state/cart/ICartState';

export const App = () => {

  // Set states
  const setJwtResponse = (jwtResponse: IJWTResponse | undefined) => {
    setIdentityState({ ...identityState, jwtResponse })
  }

  const setCurrencyName = (currencyName: string) => {
    setCurrencyState({ ...currencyState, currencyName })
  }

  const setProducts = (product: IProductValid) => {
    console.log("setProducts")
    console.log(product)

    let contains = (product: IProductValid): boolean => {
      let res = false;
      for (const elem of cartState.products) {
        if (elem.id === product.id) res = true;
      }
      return res;
    }

    if (cartState.products.length > 0) {
      if (contains(product)) {
        for (const elem of cartState.products) {
          if (elem.id === product.id) {
            elem.quantity += 1;
            break;
          }
        }
      }
      else {
        cartState.products.push(product);
      }
    }
    else {
      cartState.products.push(product);
    }
    setCartState({ ...cartState })
  }

  const deleteProduct = (productId: string) => {

    let tempList: IProductValid[] = []
    for (const elem of cartState.products) {
      if (elem.id != productId) {
        tempList.push(elem)
      }
    }
    cartState.products = tempList;
    setCartState({ ...cartState })
  }

  // Services
  const currencyService = new CurrencyService();
  const sellerService = new SellerService();

  // States
  const [identityState, setIdentityState] = useState({ ...jwtState, setJwtResponse })
  const [currencyState, setCurrencyState] = useState({ ...initialCurrencyState, setCurrencyName });
  const [cartState, setCartState] = useState({ ...initialCartState, setProducts, deleteProduct });

  useEffect(() => {
  }, [])

  return (
    <>
      <JWTContextProvider value={identityState}>
        <CurrencyContextProvider value={currencyState}>
          <CartContextProvider value={cartState}>
            <Header />
            <div className="container">
              <main role="main" className="pb-3">
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="/category/products" element={<ProductsByCategory />} />
                  <Route path="/productsbyname" element={<ProductsByName />} />
                  <Route path="/productunit" element={<ProductUnit></ProductUnit>} />
                  <Route path="/payment" element={<PaymentIndex></PaymentIndex>} />
                  <Route path="/cart" element={<CartIndex></CartIndex>} />
                  <Route path="/invoice" element={<InvoiceIndex></InvoiceIndex>} />
                  <Route path="/register" element={<Register></Register>}></Route>
                  <Route path="/login" element={<Login></Login>}></Route>
                  <Route path="/account" element={<AccountIndex></AccountIndex>}></Route>
                  <Route path="/logout" element={<Logout></Logout>}></Route>
                  <Route path="/category" element={<CategoryIndex />} />
                  <Route path="*" element={<Page404 />} />
                </Routes>
              </main>
            </div>
            <Footer />
          </CartContextProvider>
        </CurrencyContextProvider>
      </JWTContextProvider>
    </>);
}

export default App;
