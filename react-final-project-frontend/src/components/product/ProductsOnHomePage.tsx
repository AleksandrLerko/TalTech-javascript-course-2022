import { data } from 'jquery';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IProduct } from '../../domain/IProduct';
import { IServiceResult } from '../../domain/IServiceResult';
import recalculate from '../../helpfunctions/calculation';
import { ProductService } from '../../services/ProductService';
import { SellerService } from '../../services/SellerService';
import { CurrencyContext } from '../../state/currencies/CurrencyContext';
import { JWTContext } from '../../state/identities/JWTContext';
import { SellerContext } from '../../state/sellers/SellerContext';
import PictureSmall from '../pictures/PictureSmall';
import SearchInput from '../search/SearchInput';
import ProductFrame from './ProductFrame';

let initialState: IServiceResult<IProduct[]>;

export const ImageContext = React.createContext("");

const ProductsOnHomePage = () => {

    const productService = new ProductService();

    const [products, setProducts] = useState(initialState);

    // let currencyState = useContext(CurrencyContext);

    // const [imageState, setImageState] = useState("dsa");

    useEffect(() => {
        productService.getAll().then(data => setProducts(data));
        // console.log(products)
    }, [])

    return (
        <>
            <div className="row">
                {products != undefined ?
                    <>
                        {products.data!.map(item => {
                            return (
                                <ProductFrame key={item.id}
                                    id={item.id}
                                    productName={item.productName}
                                    description={item.description}
                                    price={item.price}
                                    categoryId={item.categoryId}
                                    currencyId={item.currencyId}
                                    sellerId={item.sellerId}
                                    picture={item.picture}
                                    inStocks={item.inStocks}
                                    specifications={item.specifications}
                                    feedbacks={item.feedbacks}
                                    productOrders={item.productOrders}
                                ></ProductFrame>
                            )
                        })}
                    </>
                : <div></div>}
            </div>
        </>
    )
};

export default ProductsOnHomePage;