import { IOrder } from "./IOrder";

export interface IPaymentTypes {
    id?: string,
    typeName: string,
    comment?: string,
    orders: IOrder[]
}