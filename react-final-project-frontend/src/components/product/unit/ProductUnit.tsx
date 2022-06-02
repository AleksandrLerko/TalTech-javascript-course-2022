import { data } from 'jquery';
import React, { FormEvent, MouseEventHandler, useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { IFeedback } from '../../../domain/IFeedback';
import { IInStock } from '../../../domain/IInStock';
import { IOrder } from '../../../domain/IOrder';
import { IPicture } from '../../../domain/IPicture';
import { IProduct } from '../../../domain/IProduct';
import { IServiceResult } from '../../../domain/IServiceResult';
import { IUser } from '../../../domain/IUser';
import { FeedbackService } from '../../../services/FeedbackService';
import { IdentityService } from '../../../services/IdentityService';
import { ProductService } from '../../../services/ProductService';
import { CartContext } from '../../../state/cart/CartContext';
import { IProductValid } from '../../../state/cart/ICartState';
import { CurrencyContext } from '../../../state/currencies/CurrencyContext';
import { JWTContext } from '../../../state/identities/JWTContext';
import { OrderContext } from '../../../state/orders/OrderContext';
import { SearchContext } from '../../../state/products/search/SearchContext';
import { SellerContext } from '../../../state/sellers/SellerContext';
import PictureBig from '../../pictures/PictureBig';
import SearchInput from '../../search/SearchInput';
import Seller from '../../seller/Seller';
import UserUnit from './comments/UserUnit';
import './ProductUnit.css';

let productState: IServiceResult<IProduct>;

const ProductUnit = () => {

    const productService = new ProductService();
    const feedbackService = new FeedbackService();

    const [product, setProduct] = useState(productState);
    const [isHiddenSpec, setHiddenSpec] = useState(true);
    const [isHiddenComments, setHiddenComments] = useState(true);
    const [comment, setComment] = useState("");
    const props = useLocation();

    let currencyState = useContext(CurrencyContext);
    let cartContext = useContext(CartContext);
    const jwt = useContext(JWTContext);

    useEffect(() => {
        console.log("Product Unit")
        getDataFromApi();
        console.log(product)
    }, [])

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

    function addToCart(): void {
        let productValid: IProductValid = {
            id: product.data?.id as string,
            productName: product.data?.productName as string,
            description: product.data?.description as string,
            price: product.data?.price as string,
            quantity: 1,
            categoryId: product.data!.categoryId as string,
            currencyId: product.data!.currencyId as string,
            sellerId: product.data!.sellerId as string,
            picture: product.data!.picture,
            inStocks: product.data!.inStocks,
            specifications: product.data!.specifications,
            feedbacks: product.data!.feedbacks,
            productOrders: product.data!.productOrders
        }
        cartContext.setProducts(productValid);
    }

    function getDataFromApi(): void {
        productService.getById(props.state as string).then(data => setProduct(data));
    }

    function toggleSpecificationMenu(): void {
        console.log("toggle Spec")
        setHiddenComments(true)
        setHiddenSpec(!isHiddenSpec)
    }

    function toggleCommentsMenu(): void {
        console.log("toggle Comments")
        setHiddenSpec(true)
        setHiddenComments(!isHiddenComments)
    }

    function padTo2Digits(num: number) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date: Date) {
        return [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
        ].join('/');
    }

    const handleChange = (target: EventTarget & HTMLInputElement) => {
        setComment(target.value)
    }

    async function handleSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();
        console.log("submit feedback")
        console.log(jwt.jwtResponse)
        let res = await feedbackService.add({
            timeWhenPosted: formatDate(new Date()).toString(),
            appUserId: jwt.jwtResponse?.appUserId as string,
            productId: product.data?.id as string,
            value: comment
        })
        console.log(jwt.jwtResponse)
        console.log(res)
        getDataFromApi()
        setComment("");
        // console.log(searchField)
        // setRedirect(true);
        // setRedirect(false);
    }


    return (
        <>
            {/* <SearchInput></SearchInput> */}
            {product != undefined ?
                <>
                    <SearchInput></SearchInput>
                    {/* <h1>TODO: Display comments instantly after submit</h1> */}
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <PictureBig filePath={product.data!.picture != null ? product.data?.picture.filePath as string : null}></PictureBig>
                            </div>
                            <div className="col-4">
                                <h4>{product ? product.data?.productName : ""}</h4>
                                <div>
                                    <Seller name={product.data?.sellerId}></Seller>
                                </div>
                                <div>
                                    <h6 className="p-0 m-0">In stocks: {product.data?.inStocks != undefined && parseFloat(product.data.inStocks.quantity) > 0 ? product.data?.inStocks.quantity : 0}</h6>
                                    <>
                                        {/* {(product.data?.inStocks as IInStock[]).length > 0 ?
                                            product.data?.inStocks.map(item => {
                                                return (
                                                    <div key={item.id}>
                                                        <div></div>
                                                        <LocationIndex name={item.locationId}></LocationIndex>
                                                        <span style={{ display: "inline-block" }}>{item.quantity}</span>
                                                    </div>

                                                )
                                            })
                                            : <>
                                                <div>Ooowps... there is no this product in any store available</div>
                                                <div>(But you can still buy it online)</div>
                                            </>} */}

                                    </>
                                </div>
                                <div className="pt-5">
                                    <p>{product ? product.data?.description : "Empty description...."}</p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="text-center purchase">
                                    <h4>Price: {recalculate(currencyState.currencyName, product ? product.data?.price as string : "")} {currencyState.currencyName}</h4>
                                    {product.data?.inStocks != undefined && parseFloat(product.data.inStocks.quantity) > 0 ?
                                        <>
                                            <button className="btn btn-warning btn-lg" onClick={addToCart}>Add to cart</button>
                                        </>
                                        : <button disabled className="btn btn-warning btn-lg" onClick={addToCart}>Add to cart</button>}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4"></div>
                            <div className="col-4 text-center">
                                <button className="btn btn-primary dropdown-toggle specificationButton" onClick={toggleSpecificationMenu}>Specifications</button>
                                <button className="btn btn-primary dropdown-toggle commentsButton" onClick={toggleCommentsMenu}>Comments</button>
                            </div>
                            <div className="col-4"></div>
                        </div>
                        {!isHiddenSpec ?
                            <>
                                <div className="row">
                                    {product.data?.specifications !== undefined ?
                                        <>
                                            {product.data.specifications.map(item => {
                                                return (
                                                    <div key={item.id} className="col-md-6 col-lg-4 g-mb-30">
                                                        <table className="table table-bordered table-striped">
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        {item.specificationName}:
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {item.specificationTypes.map(item => {
                                                                    return (
                                                                        <tr key={item.id}>
                                                                            <td className="col-6">{item.typeName}</td>
                                                                            <td className="col-6">{item.typeValue}</td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )
                                            })}
                                        </>
                                        : ""}
                                </div>
                            </>
                            : ""}
                        {!isHiddenComments ?
                            <>
                                <h5 className="row">Leave you feedback here</h5>
                                <div>
                                    {jwt.jwtResponse != undefined ?
                                        <form onSubmit={(e) => handleSubmit(e)}>
                                            <div className="row">
                                                <div className="input-group commentSection">
                                                    <input value={comment} className="form-control" onChange={(e) => handleChange(e.target)} placeholder="Leave your comment here..." />
                                                    <span className="input-group-btn">
                                                        <button className="btn btn-danger">Submit</button>
                                                        {/* <input type="button" className="btn btn-danger"/> */}
                                                    </span>
                                                </div>
                                            </div>
                                        </form>
                                        :
                                        <div className="row">
                                            <div className="input-group commentSection">
                                                <input className="form-control" placeholder="To leave comment please log in" readOnly />
                                                <span className="input-group-btn">
                                                    <button className="btn btn-danger" disabled>Submit</button>
                                                </span>
                                            </div>
                                        </div>

                                    }
                                </div>
                                <h6 className="row">All the comments:</h6>
                                {(product.data?.feedbacks as IFeedback[]).length > 0 ?
                                    <>
                                        {product.data?.feedbacks.map(item => {
                                            return (
                                                <div key={item.id} className="row">
                                                    <div className="col commentPadding">
                                                        <>({item.timeWhenPosted}) </>
                                                        <span className="feedback commentPadding">
                                                            <UserUnit name={item.appUserId}></UserUnit>
                                                            <span className="feedback feedbackFont commentPadding">{item.value}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </>
                                    : ""}

                            </>
                            : ""}
                    </div>
                </>
                : <div></div>}
        </>
    )
};

export default ProductUnit;