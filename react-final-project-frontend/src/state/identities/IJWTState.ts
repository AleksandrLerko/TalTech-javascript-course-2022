import React from 'react';
import { IJWTResponse } from '../../domain/IJWTResponse';

export interface IJWTState {
    jwtResponse: IJWTResponse | undefined
    setJwtResponse: (jwtResponse: IJWTResponse | undefined) => void
}