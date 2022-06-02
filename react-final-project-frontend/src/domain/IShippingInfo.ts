import { ICustomer } from "./ICustomer";
import { IShippingInfoAppUser } from "./IShippingInfoAppUser";

export interface IShippingInfo{
    id?: string,
    addressOne: string,
    addressTwo: string,
    customer?: ICustomer,
    shippingInfoAppUser?: IShippingInfoAppUser[]
}