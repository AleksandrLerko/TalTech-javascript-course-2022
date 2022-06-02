import { IOrder } from "../../domain/IOrder";

export interface IOrderState {
    orders: IOrder[],
    setOrder: (order: IOrder) => void
}