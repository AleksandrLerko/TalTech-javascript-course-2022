import { ISpecification } from "../domain/ISpecification";
import { BaseService } from "./BaseService";

export class SpecificationService extends BaseService<ISpecification>{
    constructor() {
        super("specifications");
    }
}