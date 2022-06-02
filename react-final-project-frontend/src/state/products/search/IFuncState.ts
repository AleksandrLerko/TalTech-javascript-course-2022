import { FormEvent } from "react";

export interface IFuncState {
    handleSubmit: (e: FormEvent, data: string) => void,
    handleChange: (target: EventTarget & HTMLInputElement) => void
}