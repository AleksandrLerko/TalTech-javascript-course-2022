import { data } from 'jquery';
import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { ICategory } from '../../domain/ICategory';
import "../../App.css";
import { CategoryService } from '../../services/CategoryService';
import { Link, Navigate } from 'react-router-dom';
import { IServiceResult } from '../../domain/IServiceResult';
import { CartContext } from '../../state/cart/CartContext';
import Seller from '../seller/Seller';
import { JWTContext } from '../../state/identities/JWTContext';
import { DeliveryTypeService } from '../../services/DeliveryTypeService';
import { IDeliveryType } from '../../domain/IDeliveryType';
import { PaymentTypeService } from '../../services/PaymentService';
import { IPaymentTypes } from '../../domain/IPaymentTypes';
import { ShippingInfoService } from '../../services/ShippingInfoService';
import { ShippingInfoAppUserService } from '../../services/ShippingInfoUserService';
import { IShippingInfo } from '../../domain/IShippingInfo';
import { CurrencyContext } from '../../state/currencies/CurrencyContext';
import { IOrder } from '../../domain/IOrder';
import { OrderService } from '../../services/OrderService';
import { IProductOrders } from '../../domain/IProductOrders';
import { ProductOrdersService } from '../../services/ProductOrdersService';
import { TransactionReportService } from '../../services/TransactionReport';
import { ITransactionReport } from '../../domain/ITransactionReport';
import './Payment.css';
import { ICustomer } from '../../domain/ICustomer';
import { CustomerService } from '../../services/CustomerService';
import { IInvoice } from '../../domain/IInvoice';
import { InvoiceService } from '../../services/InvoiceService';
import { IInStockService } from '../../services/InStockService';
import { IInStock } from '../../domain/IInStock';
import { IShippingInfoAppUser } from '../../domain/IShippingInfoAppUser';


interface IProps {
    shippingInfos: IShippingInfo[],
    setShippingInfo: (shippingInfo: IShippingInfo) => void
};


let initDelivState: IServiceResult<IDeliveryType[]>;
let initInvoiceState: IInvoice;
let initPaymentState: IServiceResult<IPaymentTypes[]>;
let initValue: IProps = {
    shippingInfos: [],
    setShippingInfo: () => { }
};

const PaymentIndex = () => {

    const setShippingInfo = (shippingInfo: IShippingInfo) => {
        shippingInfoState.shippingInfos.push(shippingInfo);
        setShippingInfoState({ ...shippingInfoState })
    };


    const deliveryService = new DeliveryTypeService();
    const paymentService = new PaymentTypeService();
    const shippingInfoService = new ShippingInfoService();
    const shippingInfoUserService = new ShippingInfoAppUserService();
    const orderService = new OrderService();
    const productOrdersService = new ProductOrdersService();
    const transactionReportService = new TransactionReportService();
    const customerService = new CustomerService();
    const invoiceService = new InvoiceService();
    const stocksService = new IInStockService();

    const jwt = useContext(JWTContext);
    const cart = useContext(CartContext);
    let currencyState = useContext(CurrencyContext);

    let [invoice, setInvoiceState] = useState(initInvoiceState);
    const [deliveryState, setDeliveryState] = useState(initDelivState);
    const [paymentState, setPaymentState] = useState(initPaymentState);
    let [shippingInfoState, setShippingInfoState] = useState({ ...initValue, setShippingInfo });
    const [orderInput, setOrdersInput] = useState({
        appUserId: "",
        customerId: "",
        shippingInfoId: "",
        deliveryTypeId: "",
        productOrdersId: "",
        paymentTypeId: ""
    })
    const [customerInput, setCustomerInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address1: "",
        address2: ""
    })
    let [finalPrice, setFinalPrice] = useState(0);
    let [redirect, setRedirect] = useState(false);


    useEffect(() => {
        console.log("Payment Index")
        console.log(jwt.jwtResponse)
        deliveryService.getAll().then(data => setDeliveryState(data));
        paymentService.getAll().then(data => setPaymentState(data));

        // setRedirect(false);
        if (jwt.jwtResponse != undefined) {
            getUserData();
        }
    }, [])

    async function getUserData(): Promise<void> {
        shippingInfoState.shippingInfos = [];
        let tempData = await shippingInfoUserService.getAll();
        for (const elem of tempData.data!) {
            if (elem.appUserId === jwt.jwtResponse?.appUserId) {
                let temp = await shippingInfoService.getAll();
                for (const value of temp.data!) {
                    if (value.id === elem.shippingInfoId) {
                        setShippingInfo({
                            id: value.id,
                            addressOne: value.addressOne,
                            addressTwo: value.addressTwo
                        });
                    }
                }
            }
        }
    }

    function getFinalPrice(): string {
        console.log("getFinalPrice")
        let res = 0;
        for (const elem of cart.products) {
            res += parseFloat(recalculate(currencyState.currencyName, elem.price)) * elem.quantity;
        }
        // console.log(res)
        return res.toString();
    }

    function recalculate(currency: string, price: string): string {
        let parsedPrice = parseFloat(price);
        switch (currency) {
            case "EURO":
                return parsedPrice.toString()
            case "DOLLAR":
                return Math.ceil((parsedPrice * 1.05)).toString()
            case "RUBLE":
                return Math.ceil((parsedPrice * 80)).toString();
        }

        return "";
    }

    const handleChangePayment = (target:
        EventTarget & HTMLInputElement |
        EventTarget & HTMLSelectElement |
        EventTarget & HTMLTextAreaElement) => {


        orderInput.paymentTypeId = target.id;
    }

    const handleChangeDelivery = (target:
        EventTarget & HTMLInputElement |
        EventTarget & HTMLSelectElement |
        EventTarget & HTMLTextAreaElement) => {


        let priceOfList = getFinalPrice();
        setFinalPrice(parseFloat(priceOfList) + parseFloat(target.value))
        orderInput.deliveryTypeId = target.id;

    }

    const handleChangeAddresses = (target:
        EventTarget & HTMLInputElement |
        EventTarget & HTMLSelectElement |
        EventTarget & HTMLTextAreaElement) => {
        orderInput.shippingInfoId = target.id;
    }

    const handleChangeCustomerInfo = (target:
        EventTarget & HTMLInputElement |
        EventTarget & HTMLSelectElement |
        EventTarget & HTMLTextAreaElement) => {

        setCustomerInput({ ...customerInput, [target.name]: target.value })
    }

    async function handleSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();
        orderInput.appUserId = jwt.jwtResponse?.appUserId as string;
        let orderObj: IOrder;
        if (jwt.jwtResponse != undefined) {
            orderObj = {
                appUserId: orderInput.appUserId,
                deliveryTypeId: orderInput.deliveryTypeId,
                shippingInfoId: orderInput.shippingInfoId,
                paymentTypeId: orderInput.paymentTypeId
            };
            // let shippingInfoAppUser: IShippingInfoAppUser = {
            //     shippingInfoId: orderInput.shippingInfoId,
            //     appUserId: orderInput.appUserId
            // }
            // await shippingInfoUserService.add(shippingInfoAppUser);
        }
        else {
            let customer: ICustomer = {
                firstName: customerInput.firstName,
                lastName: customerInput.lastName,
                email: customerInput.email,
                phoneNumber: customerInput.phoneNumber
            };
            let shippingInfo: IShippingInfo = {
                addressOne: customerInput.address1,
                addressTwo: customerInput.address2
            }
            let createdShippingInfo = await shippingInfoService.add(shippingInfo);
            customer.shippingInfoId = createdShippingInfo.data?.id;
            console.log(createdShippingInfo.data?.id)
            let createdCustomer = await customerService.add(customer);
            orderObj = {
                customerId: createdCustomer.data?.id,
                deliveryTypeId: orderInput.deliveryTypeId,
                shippingInfoId: createdShippingInfo.data?.id as string,
                paymentTypeId: orderInput.paymentTypeId
            };
        }



        console.log("This is the order: ")
        console.log(orderObj)
        let totalPrice = finalPrice;

        // let deliveryPrice = parseFloat((await deliveryService.getById(orderInput.deliveryTypeId)).data?.price as string);

        let tranactionReport: ITransactionReport;
        if (jwt.jwtResponse) {
            tranactionReport = {
                firstName: jwt.jwtResponse?.firstName as string,
                lastName: jwt.jwtResponse?.lastName as string,
                email: jwt.jwtResponse?.email as string,
                totalPrice: totalPrice.toString()
            };
        }
        else {
            tranactionReport = {
                firstName: customerInput.firstName as string,
                lastName: customerInput.lastName as string,
                email: customerInput.email as string,
                totalPrice: totalPrice.toString()
            };
        }

        // let transactionReport = await (await transactionReportService.getById(transactionReportId)).data as ITransactionReport;
        let invoiceTemp: IInvoice = {
            date: new Date().toTimeString(),
            firstName: jwt.jwtResponse != undefined ? jwt.jwtResponse?.firstName : customerInput.firstName,
            lastName: jwt.jwtResponse != undefined ? jwt.jwtResponse?.lastName : customerInput.lastName,
            email: jwt.jwtResponse != undefined ? jwt.jwtResponse?.email : customerInput.email,
            paymentMethodName: (await paymentService.getById(orderInput.paymentTypeId)).data?.typeName as string,
            deliveryMethodName: (await deliveryService.getById(orderInput.deliveryTypeId)).data?.typeName as string,
            fullAddress: jwt.jwtResponse != undefined ? ((
                (await shippingInfoService.getById(orderInput.shippingInfoId)).data?.addressOne as string) +
                ((await shippingInfoService.getById(orderInput.shippingInfoId)).data?.addressTwo as string)) : (customerInput.address1 + ", " + customerInput.address2),
            finalPrice: finalPrice.toString()
        }

        let invoiceFromDb = (await invoiceService.add(invoiceTemp)).data


        invoice = invoiceFromDb as IInvoice;
        invoice.id = invoiceFromDb?.id;

        setInvoiceState({ ...invoice })
        // console.log(invoice);
        tranactionReport.invoiceId = invoiceFromDb?.id;
        let transactionReportId = (await transactionReportService.add(tranactionReport)).data?.id as string

        // console.log(transactionReportId)

        console.log("Number of products " + cart.products.length)
        for (const product of cart.products) {
            let stockObjAll = (await stocksService.getAll()).data as IInStock[];
            for (const elem of stockObjAll) {
                if (elem.id === product.inStocks.id) {
                    elem.quantity = (parseFloat(elem.quantity) - product.quantity).toString();
                    stocksService.put(elem, elem.id as string)
                }
            }
            let orderData: IServiceResult<IOrder> = await orderService.add(orderObj);
            let productOrderObj: IProductOrders = {
                productId: product.id as string,
                orderId: orderData.data!.id as string,
                transactionReportId: transactionReportId as string
            }

            if (product.quantity > 1) {
                for (let index = 0; index < product.quantity; index++) {
                    await productOrdersService.add(productOrderObj);
                }
            }
            else {
                await productOrdersService.add(productOrderObj);
            }
        }


        console.log("invoice")
        console.log(invoice)
        setRedirect(true);

    }

    return (
        <>
            {deliveryState != undefined && paymentState != undefined && shippingInfoState != undefined ?
                <div className="container">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="row">
                            <div className="col-4">
                                <h5>Payment methods</h5>
                                {paymentState.data?.map(item => {
                                    return (
                                        <div className="row">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" onChange={(e) => handleChangePayment(e.target)} name="payment" value={item.typeName} type="radio" id={item.id} />
                                                <label className="form-check-label" htmlFor={item.typeName}>{item.typeName}</label>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            {jwt.jwtResponse ?
                                <>
                                    <div className="col-4">
                                        <h5>Your addresses: </h5>
                                        {shippingInfoState.shippingInfos != undefined && shippingInfoState.shippingInfos.length > 0 ?
                                            <>
                                                {shippingInfoState.shippingInfos.map(item => {
                                                    return (
                                                        // <div className="row">{item.addressOne}, {item.addressTwo}</div>
                                                        <div className="row">
                                                            <div className="form-check form-check-inline">
                                                                <input className="form-check-input" onChange={(e) => handleChangeAddresses(e.target)} name="address" value={item.addressOne + item.addressTwo} type="radio" id={item.id} />
                                                                <label className="form-check-label" htmlFor={item.addressOne + item.addressTwo}>{item.addressOne}, {item.addressTwo}</label>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </>
                                            :
                                            <>
                                                <Link className="btn btn-warning" to="/account">Add new addresses</Link>
                                            </>
                                        }
                                    </div>
                                </>
                                :
                                <>
                                    {/* <div className="col-6">Payment methods</div> */}
                                    <div className="col-4">
                                        <h5>Customer account details</h5>
                                        <div className="form-group">
                                            <label className="control-label">First name</label>
                                            <input value={customerInput.firstName} name="firstName" onChange={(e) => handleChangeCustomerInfo(e.target)} className="form-control" type="text" />
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">Last name</label>
                                            <input value={customerInput.lastName} name="lastName" onChange={(e) => handleChangeCustomerInfo(e.target)} className="form-control" type="text" />
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">Email</label>
                                            <input value={customerInput.email} name="email" onChange={(e) => handleChangeCustomerInfo(e.target)} className="form-control" type="email" />
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">Phone number</label>
                                            <input value={customerInput.phoneNumber} name="phoneNumber" onChange={(e) => handleChangeCustomerInfo(e.target)} className="form-control" type="text" />
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">Address 1</label>
                                            <input value={customerInput.address1} name="address1" onChange={(e) => handleChangeCustomerInfo(e.target)} className="form-control" type="text" />
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">Address 2</label>
                                            <input value={customerInput.address2} name="address2" onChange={(e) => handleChangeCustomerInfo(e.target)} className="form-control" type="text" />
                                        </div>
                                        {/* <div className="form-group">
                                            <input type="submit" value="Save" className="btn btn-primary accountSubmitButton" />
                                        </div> */}
                                    </div>

                                    {/* <div className="col-2">Products list</div> */}
                                </>
                            }
                            <div className="col-4">
                                <h5>Products list</h5>
                                {cart.products.map(item => {
                                    return (
                                        <>
                                            <div className="row">
                                                <>{item.productName} - {recalculate(currencyState.currencyName, (item.price.toString()))} {currencyState.currencyName} ({item.quantity})</>
                                            </div>
                                        </>
                                    )
                                })}
                                <h6>Price: {getFinalPrice()}</h6>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-8">
                                <h5>Delivery methods</h5>
                                {deliveryState.data?.map(item => {
                                    return (
                                        // <div className="row">{item.typeName} {item.price}</div>
                                        <div className="row">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" onChange={(e) => handleChangeDelivery(e.target)} name="delivery" value={item.price} type="radio" id={item.id} />
                                                <label className="form-check-label" htmlFor={item.typeName}>{item.typeName} - {recalculate(currencyState.currencyName, (item.price.toString()))} {currencyState.currencyName} </label>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="col-4">
                                <button className="btn btn-warning btn-lg">PAY</button> Final price = {finalPrice}
                                {redirect === true &&
                                    <>
                                        <Link className="btn btn-warning btn-lg" to="/invoice" state={invoice.id != undefined ? invoice.id : ""}>Create invoice</Link>
                                    </>
                                }
                            </div>
                        </div>
                    </form>
                </div>
                : ""}
        </>
    );

};

export default PaymentIndex;