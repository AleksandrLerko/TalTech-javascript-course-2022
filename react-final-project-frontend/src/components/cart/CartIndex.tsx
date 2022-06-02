import { data } from 'jquery';
import React, { useContext, useEffect, useState } from 'react';
import { ICategory } from '../../domain/ICategory';
import "../../App.css";
import { CategoryService } from '../../services/CategoryService';
import { Link, Navigate } from 'react-router-dom';
import { IServiceResult } from '../../domain/IServiceResult';
import { CartContext } from '../../state/cart/CartContext';
import Seller from '../seller/Seller';
import { IProduct } from '../../domain/IProduct';

interface IValidCart {
    id: string,
    productName: string,
    price: number,
    quantity: number
}

interface IValidCartList {
    validCart: IValidCart[]
    setValidCart: (cart: IValidCart) => void
}
let initValue: IValidCartList = {
    validCart: [],
    setValidCart: () => {}
};

const CartIndex = () => {

    // const setValidCart = (cart: IValidCart) => {
    //     if (validCartState.validCart.length > 0) {
    //         for (const elem of validCartState.validCart) {
    //             if (elem.id !== cart.id) {
    //                 validCartState.validCart.push(cart);
    //             }
    //             else{
    //                 elem.quantity += 1;
    //             }
    //         }
    //     } else {
    //         validCartState.validCart.push(cart);
    //     }
    //     setCartState({...validCartState})
    // }
    const cartContext = useContext(CartContext);

    // const [validCartState, setCartState] = useState({...initValue, setValidCart});

    useEffect(() => {
        console.log("CartIndex");
        // validCartState.validCart = [];
        // for (const elem of cartContext.products) {
        //     setValidCart({
        //         id: elem.id as string,
        //         productName: elem.productName,
        //         price: parseFloat(elem.price),
        //         quantity: 1
        //     });
        // }
    }, [])


    function deleteProduct(e: React.MouseEvent<HTMLElement>, productId: string) {
        e.preventDefault();
        console.log("Deleting.....")
        console.log(productId)
        cartContext.deleteProduct(productId);
    }

    if (cartContext.products.length === 0) {
        return <Navigate to="/"></Navigate>
    }

    return (
        <>
            {cartContext.products != undefined && cartContext.products.length > 0 ?
                <>
                    <h4>Your cart is: </h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    Product name
                                </th>
                                <th>
                                    Price
                                </th>
                                <th>
                                    Quantity
                                </th>
                                <th>
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <>{cartContext.products.map(item => {
                                return (
                                    <tr key={item.id}>
                                        <td>
                                            {item.productName}
                                        </td>
                                        <td>
                                            {item.price}
                                        </td>
                                        <td>
                                            x{item.quantity}
                                        </td>
                                        <td>
                                            {<button onClick={(e) => deleteProduct(e, item.id as string)}><i className="fa fa-times text-primary"></i></button>}
                                        </td>
                                    </tr>
                                )
                            })}</>
                        </tbody>
                    </table>
                    {/* <button className="btn btn-danger">Buy</button> */}
                    <Link className="btn btn-danger" to="/payment">Buy</Link>
                </>
                : ""}
        </>
    );

};

export default CartIndex;