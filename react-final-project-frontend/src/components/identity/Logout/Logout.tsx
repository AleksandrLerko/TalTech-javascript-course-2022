import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { IJWTResponse } from '../../../domain/IJWTResponse';
import { IdentityService } from '../../../services/IdentityService';
import { JWTContext } from '../../../state/identities/JWTContext';



const Logout = () => {
    const jwtContext = useContext(JWTContext)

    useEffect(() => {
        jwtContext.setJwtResponse(undefined);
    })

    return (
        <Navigate to="/"></Navigate>
    )
}

export default Logout;