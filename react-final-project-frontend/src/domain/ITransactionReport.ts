import { IProductOrders } from "./IProductOrders";

export interface ITransactionReport {
    id?: string,
    invoiceId?: string,
    createdAt?: string,
    firstName: string,
    lastName: string,
    email: string,
    totalPrice: string,
    comment?: string,
    productOrders?: IProductOrders[]
}