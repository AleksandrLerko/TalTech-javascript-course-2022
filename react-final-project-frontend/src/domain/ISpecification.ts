import { ISpecificationTypes } from "./ISpecificationTypes";

export interface ISpecification {
    id?: string,
    specificationName: string,
    productId: string,
    specificationTypes: ISpecificationTypes[]
}