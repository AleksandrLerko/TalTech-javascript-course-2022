import React, { FormEvent } from 'react';
import '../../../App.css'

interface IProps {
    values: {
        inputEmail: string;
        inputPassword: string;
        inputFirstName: string;
        inputLastName: string;
        errorMsg: string;
    }

    handleChange: (target:
        EventTarget & HTMLInputElement |
        EventTarget & HTMLSelectElement |
        EventTarget & HTMLTextAreaElement) => void

    handleSubmit: (target: FormEvent) => void
}

const RegisterView = (props: IProps) => {
    return (
        <form onSubmit={(e) => props.handleSubmit(e)}>
            <h1>Register</h1>
            <hr />
            <div className="row">
                <div className="col-md-4">
                <div v-if="errorMsg != null" className="text-danger validation-summary-errors" data-valmsg-summary="true">
                        {props.values.errorMsg !== "" &&
                            <ul>
                                <li>{props.values.errorMsg}</li>
                            </ul>
                        }
                    </div>
                    <div>
                        <div className="form-group">
                            <label className="control-label">Email</label>
                            <input required value={props.values.inputEmail} name="inputEmail" onChange={(e) => props.handleChange(e.target)} className="form-control" type="email" />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Password</label>
                            <input required value={props.values.inputPassword} name="inputPassword" onChange={(e) => props.handleChange(e.target)} className="form-control" type="password" />
                        </div>
                        <div className="form-group">
                            <label className="control-label">First name</label>
                            <input required value={props.values.inputFirstName} name="inputFirstName" onChange={(e) => props.handleChange(e.target)} className="form-control" type="firstName" />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Last name</label>
                            <input required value={props.values.inputLastName} name="inputLastName" onChange={(e) => props.handleChange(e.target)} className="form-control" type="lastName" />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Sumbit" className="btn btn-primary accountSubmitButton" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default RegisterView;