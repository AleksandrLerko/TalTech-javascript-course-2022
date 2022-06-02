import { IDeliveryType } from "../domain/IDeliveryType";
import { BaseService } from "./BaseService";

export class DeliveryTypeService extends BaseService<IDeliveryType>{
    constructor() {
        super("deliveryTypes");
    }
}
