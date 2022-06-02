import { FormEvent, useEffect, useState } from "react";
import { IDeliveryType } from "../../domain/IDeliveryType";
import { IServiceResult } from "../../domain/IServiceResult";
import { DeliveryTypeService } from "../../services/DeliveryTypeService";
import { ShippingInfoService } from "../../services/ShippingInfoService";

let deliveryType: IServiceResult<IDeliveryType[]>;

interface IProps {
    handleChange: (target:
        EventTarget & HTMLInputElement |
        EventTarget & HTMLSelectElement |
        EventTarget & HTMLTextAreaElement) => void
}

const DeliveryTypeIndex = (props: IProps) => {

    const deliveryTypeService = new DeliveryTypeService();

    const [deliveryTypeState, setDeliveryType] = useState(deliveryType);

    useEffect(() => {
        console.log("DeliveryType Index");
        deliveryTypeService.getAll().then(data => setDeliveryType(data));
    }, [])

    return (
        <>
            {deliveryTypeState != undefined ?
                <select className="btn dropdown-toggle stripped" value={deliveryTypeState.data![0].id} onChange={(e) => props.handleChange(e.target)} name="deliveryTypeId" id="deliveryType">
                    {deliveryTypeState.data!.map(item => {
                        return (
                            <option key={item.id} value={item.id}>{item.typeName}</option>
                        );
                    })}
                </select>
                : ""}
        </>

    );

};

export default DeliveryTypeIndex;