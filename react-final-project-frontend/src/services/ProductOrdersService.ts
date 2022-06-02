import { IProductOrders } from "../domain/IProductOrders";
import { BaseService } from "./BaseService";

export class ProductOrdersService extends BaseService<IProductOrders>{
    constructor() {
        super("productorders");
    }
}