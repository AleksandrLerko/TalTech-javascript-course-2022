import { ICategory } from "../domain/ICategory";
import { BaseService } from "./BaseService";

export class CategoryService extends BaseService<ICategory>{
    constructor() {
        super("categories");
    }
}
