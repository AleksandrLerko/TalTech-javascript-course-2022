import { IPicture } from "../../domain/IPicture";

export interface IPictureState {
    picture: IPicture | undefined,
    setPicture: (value: IPicture) => void
}