import { ICategory } from "../domain/ICategory";
import { IShippingInfo } from "../domain/IShippingInfo";
import { BaseService } from "./BaseService";

export class ShippingInfoService extends BaseService<IShippingInfo>{
    constructor() {
        super("shippinginfos");
    }
}
