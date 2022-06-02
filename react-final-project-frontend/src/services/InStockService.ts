import { IInStock } from "../domain/IInStock";
import { IInvoice } from "../domain/IInvoice";
import { IOrder } from "../domain/IOrder";
import { BaseService } from "./BaseService";

export class IInStockService extends BaseService<IInStock>{
    constructor() {
        super("instocks");
    }
}