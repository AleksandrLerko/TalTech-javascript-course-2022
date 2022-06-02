import { ICategory } from "../domain/ICategory";
import { IShippingInfo } from "../domain/IShippingInfo";
import { IShippingInfoAppUser } from "../domain/IShippingInfoAppUser";
import { BaseService } from "./BaseService";

export class ShippingInfoAppUserService extends BaseService<IShippingInfoAppUser>{
    constructor() {
        super("shippinginfoappusers");
    }
}
