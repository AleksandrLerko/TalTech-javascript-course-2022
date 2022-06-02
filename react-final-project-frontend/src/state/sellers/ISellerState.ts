import { ISeller } from "../../domain/ISeller";

export interface ISellerState {
    sellers: ISeller[],
    setSellers: (value: ISeller[]) => void
}