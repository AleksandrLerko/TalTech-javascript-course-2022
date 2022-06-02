import { IProduct } from "../domain/IProduct";
import { BaseService } from "./BaseService";
import httpClient from "./HttpClient";

export class ProductService extends BaseService<IProduct>{
    constructor() {
        super("products");
    }

    async getProductByCategory(categoryId: string): Promise<IProduct[]> {
        console.log("get");
        let response = await httpClient.get(`/v1.0/products/category/${categoryId}`);
        console.log(response);
        let res = response.data as IProduct[];
        return res;
    }
    
    async getProductByName(productName: string): Promise<IProduct[]> {
        console.log("get");
        let response = await httpClient.get(`/v1.0/products/name/${productName}`);
        console.log(response);
        let res = response.data as IProduct[];
        return res;
    }
}
