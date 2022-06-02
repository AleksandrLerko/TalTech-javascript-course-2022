import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { IProduct } from '../../domain/IProduct';
import { ProductService } from '../../services/ProductService';
import { CurrencyContext } from '../../state/currencies/CurrencyContext';
import { JWTContext } from '../../state/identities/JWTContext';
import { SearchContext } from '../../state/products/search/SearchContext';
import { SellerContext } from '../../state/sellers/SellerContext';
import PictureBig from '../pictures/PictureBig';
import PictureSmall from '../pictures/PictureSmall';
import SearchInput from '../search/SearchInput';
import Seller from '../seller/Seller';
import { ImageContext } from './ProductsOnHomePage';

// const productState: IProduct[] = [];

const ProductFrame = (props: IProduct) => {

    // const productService = new ProductService();

    // const [product, setProduct] = useState(productState)

    // let { categoryId } = useParams();

    // const props = useLocation();

    let currencyState = useContext(CurrencyContext);

    let sellersState = useContext(SellerContext);

    // let searchContext = useContext(SearchContext);

    useEffect(() => {
        console.log("Product Frame")
        // console.log(props)
        // console.log(props.picture)
    }, [])

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

    function getValidSellerName(sellerId: string): string {
        let res = "";
        // console.log(sellersState)
        for (const elem of sellersState.sellers) {
            // console.log(elem)
            if (elem.id === sellerId) {
                res = elem.sellerName;
            }
        }
        return res;
    }

    return (
        <div className="col-md-6 col-lg-4 g-mb-30 productCol">
            <article className="u-shadow-v18 g-bg-white text-center rounded g-px-20 g-py-40 g-mb-5">
                <>{props.picture === null ? (
                    <>
                        <PictureSmall filePath={null}></PictureSmall>
                    </>
                ) : (
                    <>
                        <PictureSmall filePath={props.picture.filePath}></PictureSmall>
                    </>
                )}</>
                <h4 className="h5 g-color-black g-font-weight-600 g-mb-10">{props.productName}</h4>
                {/* <sub>{getValidSellerName(props.sellerId)}</sub> */}
                <sub><Seller name={props.sellerId}></Seller></sub>
                {/* <p>{props.description}</p> */}
                <span className="d-block g-color-primary g-font-size-16">{recalculate(currencyState.currencyName, props.price)} {currencyState.currencyName}</span>
                <Link to="/productunit" state={props.id as string} className="btn btn-danger" active-classname="active">Check out</Link>
            </article>
        </div>
    )
};

export default ProductFrame;