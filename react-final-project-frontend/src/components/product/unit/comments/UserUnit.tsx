import { data } from 'jquery';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IServiceResult } from '../../../../domain/IServiceResult';
import { IUser } from '../../../../domain/IUser';
import { IdentityService } from '../../../../services/IdentityService';
import './UserUnit.css'

let userState: IServiceResult<IUser>;

const UserUnit = (props: any) => {

    const identityService = new IdentityService();

    const [user, setUser] = useState(userState);

    useEffect(() => {
        console.log("User Unit")
        identityService.getUserById(props.name).then(data => setUser(data));
    }, [])

    return (
        <>
            {user != undefined ?
                <>
                    {user.data?.firstName as string + " " + user.data?.lastName as string + ": "}
                </>
                : ""}
        </>
    );

};

export default UserUnit;