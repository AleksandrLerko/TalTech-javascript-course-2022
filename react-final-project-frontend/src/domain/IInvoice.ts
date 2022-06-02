import { ITransactionReport } from "./ITransactionReport";

export interface IInvoice {
    id?: string,
    date: string,
    firstName: string,
    lastName: string,
    email: string,
    paymentMethodName: string,
    deliveryMethodName: string,
    fullAddress: string,
    finalPrice: string,
    transactionReport?: ITransactionReport
}