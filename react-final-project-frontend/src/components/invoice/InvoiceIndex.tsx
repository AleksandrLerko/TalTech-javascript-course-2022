import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { IInvoice } from '../../domain/IInvoice';
import { IProduct } from '../../domain/IProduct';
import { IProductOrders } from '../../domain/IProductOrders';
import { IServiceResult } from '../../domain/IServiceResult';
import { InvoiceService } from '../../services/InvoiceService';
import { ProductService } from '../../services/ProductService';
import { CartContext } from '../../state/cart/CartContext';
import { CurrencyContext } from '../../state/currencies/CurrencyContext';

interface Products {
    products: IProduct[],
    setProduct: (product: IProduct) => void
};

let initState: IServiceResult<IInvoice>;
let initProductState: Products = {
    products: [],
    setProduct: () => { }
};

const InvoiceIndex = () => {

    const setProduct = (product: IProduct[]) => {
        productsState.products = product;
        setProductState({ ...productsState })
    }

    const invoiceService = new InvoiceService();
    const productService = new ProductService();

    const props = useLocation();
    const currency = useContext(CurrencyContext);
    const cart = useContext(CartContext);

    const [invoiceState, setInvoiceState] = useState(initState);
    let [productsState, setProductState] = useState({ ...initProductState, setProduct });

    // let [test, settest] = useState(false);

    useEffect(() => {
        console.log("invoice index");
        console.log(props.state)
        invoiceService.getById(props.state as string).then(data => setInvoiceState(data))
        getData();
    }, [])

    async function getData(): Promise<void> {
        productsState.products = [];
        console.log("getData")
        let listOfProducts: IProduct[] = [];
        let test: IInvoice = (await invoiceService.getById(props.state as string)).data as IInvoice;
        console.log("fetched data")
        console.log(test);
        if (test != undefined) {
            for (const elem of test.transactionReport?.productOrders as IProductOrders[]) {
                let product = (await productService.getById(elem.productId)).data as IProduct
                listOfProducts.push(product);
            }

            console.log("listOfProducts")
            console.log(listOfProducts)

            setProduct(listOfProducts)
        }

        for (const elem of listOfProducts) {
            cart.deleteProduct(elem.id as string)
        }

    }

    function recalculate(currency: string, price: string): string {
        let parsedPrice = parseFloat(price);
        switch (currency) {
            case "Euro":
                return parsedPrice.toString()
            case "Dollar":
                return Math.ceil((parsedPrice * 1.05)).toString()
            case "Ruble":
                return Math.ceil((parsedPrice * 80)).toString();
        }

        return "";
    }


    return (
        <>
        {props.state === null &&
        <Navigate to="/"></Navigate>
        }
            {invoiceState != undefined ?
                <>
                <h1>Your invoice is: </h1>
                    <div className="container">
                        {productsState.products.length > 0 ?
                            <>
                                <div className="row">
                                    <div className="col-6">Date</div>
                                    <div className="col-6">{invoiceState.data?.date}</div>
                                </div>
                                <div className="row">
                                    <div className="col-6">Full name</div>
                                    <div className="col-6">{invoiceState.data?.firstName as string + " " + invoiceState.data?.lastName as string}</div>
                                </div>
                                <div className="row">
                                    <div className="col-6">Payment by:</div>
                                    <div className="col-6">{invoiceState.data?.paymentMethodName}</div>
                                </div>
                                <div className="row">
                                    <div className="col-6">Delivery by:</div>
                                    <div className="col-6">{invoiceState.data?.deliveryMethodName}</div>
                                </div>
                                <div className="row">
                                    <div className="col-6">Shipping to</div>
                                    <div className="col-6">{invoiceState.data?.fullAddress}</div>
                                </div>
                                <div className="row">
                                    <div className="col-6">List of products:</div>
                                    <div className="col-6">
                                    {productsState.products.map(item => {
                                            return (
                                                <div>{item.productName} - {recalculate(currency.currencyName, item.price.toString() as string)} {currency.currencyName}</div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">Total price</div>
                                    <div className="col-6">{recalculate(currency.currencyName, invoiceState.data?.finalPrice.toString() as string)} {currency.currencyName}</div>
                                </div>
                            </>
                            : ""}
                    </div>
                </>
                : <div></div>}
        </>

    )
}

export default InvoiceIndex;