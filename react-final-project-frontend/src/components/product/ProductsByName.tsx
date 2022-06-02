import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { IProduct } from '../../domain/IProduct';
import { ProductService } from '../../services/ProductService';
import { CurrencyContext } from '../../state/currencies/CurrencyContext';
import { JWTContext } from '../../state/identities/JWTContext';
import { SearchContext } from '../../state/products/search/SearchContext';
import { SellerContext } from '../../state/sellers/SellerContext';
import PictureSmall from '../pictures/PictureSmall';
import SearchInput from '../search/SearchInput';
import { RedirectContext } from '../search/SearchView';
import ProductFrame from './ProductFrame';
import { ImageContext } from './ProductsOnHomePage';

const initialState: IProduct[] = [];

const ProductsByName = () => {

    const productService = new ProductService();

    const [products, setProducts] = useState(initialState)

    const props = useLocation();

    useEffect(() => {
        console.log("ProductsByName")
        console.log(props.state)
        productService.getProductByName(props.state as string).then(data => setProducts(data));
    }, [])

    return (
        <>
            <div className="row">
                <Link to="/">Back to home page</Link>
                <h4 className="notbold">Products by <>
                    <span className="searchedElement">{props.state as string}</span>
                </> name are:</h4>
            </div>
            <div className="row">
                {products != undefined ?
                    <>
                        {products.map(item => {
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

export default ProductsByName;