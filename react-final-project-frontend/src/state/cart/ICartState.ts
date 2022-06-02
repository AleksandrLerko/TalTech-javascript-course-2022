import { IFeedback } from "../../domain/IFeedback";
import { IInStock } from "../../domain/IInStock";
import { IPicture } from "../../domain/IPicture";
import { IProduct } from "../../domain/IProduct";
import { IProductOrders } from "../../domain/IProductOrders";
import { ISpecification } from "../../domain/ISpecification";

export interface IProductValid {
    id?: string,
    productName: string,
    description: string,
    price: string,
    quantity: number,
    categoryId: string,
    currencyId: string,
    sellerId: string
    picture: IPicture,
    inStocks: IInStock,
    specifications: ISpecification[]
    feedbacks: IFeedback[],
    productOrders: IProductOrders[]
}

export interface ICartState {
    products: IProductValid[]
    setProducts: (product: IProductValid) => void
    deleteProduct: (productId: string) => void
}