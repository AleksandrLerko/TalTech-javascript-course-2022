import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { IJWTResponse } from '../../../domain/IJWTResponse';
import { IdentityService } from '../../../services/IdentityService';
import { JWTContext } from '../../../state/identities/JWTContext';
import RegisterView from './RegisterView';



const Register = () => {
    const identityService = new IdentityService();

    const [values, setInput] = useState({
        inputEmail: "",
        inputPassword: "",
        inputFirstName: "",
        inputLastName: "",
        errorMsg: ""
    });

    const [redirect, setRedirect] = useState(false);

    const jwtContext = useContext(JWTContext)

    const handleChange = (target:
        EventTarget & HTMLInputElement |
        EventTarget & HTMLSelectElement |
        EventTarget & HTMLTextAreaElement) => {
        //debugger;
        // console.log(target.name, target.value, target.type, target)

        setInput({ ...values, [target.name]: target.value })

    };

    const handleSubmit = async (target: FormEvent) => {
        setRedirect(false)
        target.preventDefault();
        let res = await identityService.registerUser(
            values.inputEmail, 
            values.inputPassword,
            values.inputFirstName,
            values.inputLastName);
        console.log(target)
        if (res.status === 200) {
            let jwtResponse: IJWTResponse = {
                email: (res.data?.email) as string,
                firstName: (res.data?.firstName) as string,
                lastName: (res.data?.lastName) as string,
                token: (res.data?.token) as string,
                refreshToken: (res.data?.refreshToken) as string,
                appUserId: (res.data?.appUserId) as string
            } 
            jwtContext.setJwtResponse(jwtResponse);
            // jwtContext.jwtResponse = jwtResponse
            setRedirect(true)
        }
        else{
            setInput({ ...values, errorMsg: res.errorMsg as string })
        }
    }

    return (
        <>
            <RegisterView values={values} handleChange={handleChange} handleSubmit={handleSubmit}></RegisterView>
            {redirect === true &&
                <Navigate to="/"></Navigate>
            }
        </>
    )
}

export default Register;