import { IOrder } from "./IOrder";
import { IShippingInfo } from "./IShippingInfo";

export interface IDeliveryType{
    id?: string,
    typeName: string,
    price: string,
    comment?: string,
    shippingInfos: IShippingInfo[],
    orders: IOrder[]
}