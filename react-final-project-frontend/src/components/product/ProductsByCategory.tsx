import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { IProduct } from '../../domain/IProduct';
import { ProductService } from '../../services/ProductService';
import { CurrencyContext } from '../../state/currencies/CurrencyContext';
import { JWTContext } from '../../state/identities/JWTContext';
import { SellerContext } from '../../state/sellers/SellerContext';
import PictureSmall from '../pictures/PictureSmall';
import SearchInput from '../search/SearchInput';
import ProductFrame from './ProductFrame';
import { ImageContext } from './ProductsOnHomePage';

const initialState: IProduct[] = [];

const ProductsByCategory = () => {

    const productService = new ProductService();

    const [products, setProducts] = useState(initialState)
    
    const props = useLocation();

    useEffect(() => {
        console.log("productsbycategory")
        productService.getProductByCategory(props.state as string).then(data => setProducts(data));
    }, [])

    return (
        <>
            <SearchInput></SearchInput>
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

export default ProductsByCategory;