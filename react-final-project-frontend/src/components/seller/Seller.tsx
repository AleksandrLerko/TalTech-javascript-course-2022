import { data } from 'jquery';
import { useEffect, useState } from 'react';
import { IPicture } from '../../domain/IPicture';
import { ISeller } from '../../domain/ISeller';
import { IServiceResult } from '../../domain/IServiceResult';
import { SellerService } from '../../services/SellerService';
import './Seller.css';

let sellerState: IServiceResult<ISeller>;

const Seller = (name: any) => {

    const sellerService = new SellerService();

    const [seller, setSellerState] = useState(sellerState)
    
    useEffect(() => {
        console.log("Seller")
        sellerService.getById(name.name as string).then(data => setSellerState(data))
    }, [])



    return (
        <>
            {/* <img className="d-inline-block img-fluid mb-4 pictureCol" 
            src={props.filePath != null ? props.filePath : "http://www.agarra.org/wp-content/plugins/lightbox/images/No-image-found.jpg"}/> */}
            <h5 className="sellerMarginDown notbold">{seller ? seller.data?.sellerName : ""}</h5>
        </>
    )
};

export default Seller;