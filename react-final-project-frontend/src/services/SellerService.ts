import { ISeller } from "../domain/ISeller";
import { BaseService } from "./BaseService";

export class SellerService extends BaseService<ISeller>{
    constructor() {
        super("sellers");
    }
}
