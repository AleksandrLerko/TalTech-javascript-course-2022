import { ICurrency } from "../domain/ICurrency";
import { ICustomer } from "../domain/ICustomer";
import { BaseService } from "./BaseService";

export class CustomerService extends BaseService<ICustomer>{
    constructor() {
        super("customers");
    }
}
