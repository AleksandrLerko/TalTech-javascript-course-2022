import { IOrder } from "./IOrder";

export interface ICustomer {
    id?: string,
    firstName: string,
    lastName: string,   
    email: string,
    phoneNumber: string,
    shippingInfoId?: string,
    orders?: IOrder[]
}