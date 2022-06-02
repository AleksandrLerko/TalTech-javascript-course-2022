import { IPaymentTypes } from "./IPaymentTypes";
import { IProductOrders } from "./IProductOrders";
import { ITransactionReport } from "./ITransactionReport";

export interface IOrder {
    id?: string,
    createdAt?: string,
    appUserId?: string,
    customerId?: string,
    deliveryTypeId: string,
    shippingInfoId: string,
    paymentTypeId: string,
    transactionReport?: ITransactionReport,
    productOrders?: IProductOrders[]
}