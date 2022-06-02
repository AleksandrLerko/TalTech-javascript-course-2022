import { IError } from "./IError";
import { IFeedback } from "./IFeedback";
import { IInStock } from "./IInStock";
import { IOrder } from "./IOrder";
import { IPicture } from "./IPicture";
import { IProductOrders } from "./IProductOrders";
import { ISpecification } from "./ISpecification";

export interface IProduct {
    id?: string,
    productName: string,
    description: string,
    price: string,
    categoryId: string,
    currencyId: string,
    sellerId: string
    picture: IPicture,
    inStocks: IInStock,
    specifications: ISpecification[]
    feedbacks: IFeedback[],
    productOrders: IProductOrders[]
}