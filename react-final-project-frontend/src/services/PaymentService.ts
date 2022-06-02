import { IPaymentTypes } from "../domain/IPaymentTypes";
import { BaseService } from "./BaseService";

export class PaymentTypeService extends BaseService<IPaymentTypes>{
    constructor() {
        super("paymenttypes");
    }
}