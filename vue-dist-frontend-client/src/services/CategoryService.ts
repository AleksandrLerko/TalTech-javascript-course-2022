import type { ICategory } from "@/domain/ICategory";
import httpClient from "@/http-client";
import BaseService from "./BaseService";

export class CategoryService extends BaseService<ICategory> {
    
    constructor() {
        super("categories");
        
    }
}