import { useEffect } from 'react';
import { IPicture } from '../../domain/IPicture';

const PictureBig = (props: IPicture) => {

    useEffect(() => {
        console.log("Picture big")
    }, [])



    return (
        <>
            <img className="d-inline-block img-fluid mb-4 pictureCol" 
            src={props.filePath != null ? props.filePath : "http://www.agarra.org/wp-content/plugins/lightbox/images/No-image-found.jpg"}/>
        </>
    )
};

export default PictureBig;