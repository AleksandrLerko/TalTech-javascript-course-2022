import { ICurrency } from "../domain/ICurrency";
import { BaseService } from "./BaseService";

export class CurrencyService extends BaseService<ICurrency>{
    constructor() {
        super("currencies");
    }
}
