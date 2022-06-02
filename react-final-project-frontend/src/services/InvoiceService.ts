import { IInvoice } from "../domain/IInvoice";
import { IOrder } from "../domain/IOrder";
import { BaseService } from "./BaseService";

export class InvoiceService extends BaseService<IInvoice>{
    constructor() {
        super("invoices");
    }
}