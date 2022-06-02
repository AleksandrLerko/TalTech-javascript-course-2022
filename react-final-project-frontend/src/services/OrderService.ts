import { IOrder } from "../domain/IOrder";
import { BaseService } from "./BaseService";

export class OrderService extends BaseService<IOrder>{
    constructor() {
        super("orders");
    }
}