import React from 'react';
import { IPictureState } from './IPictureState';

export const initialPictureState : IPictureState = {
    picture: undefined,
    setPicture: () => {}
}

export const PictureContext = React.createContext<IPictureState>(initialPictureState);
export const PictureContextProvider = PictureContext.Provider;