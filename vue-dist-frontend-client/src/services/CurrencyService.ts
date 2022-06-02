import type { ICurrency } from "@/domain/ICurrency";
import httpClient from "@/http-client";
import BaseService from "./BaseService";

export class CurrencyService extends BaseService<ICurrency> {
    
    constructor() {
        super("currencies");
        
    }
}