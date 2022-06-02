import React, { FormEvent } from 'react';

interface IProps {
    values: {
        inputEmail: string;
        inputPassword: string;
        errorMsg: string | null;
    }

    handleChange: (target:
        EventTarget & HTMLInputElement |
        EventTarget & HTMLSelectElement |
        EventTarget & HTMLTextAreaElement) => void

    handleSubmit: (target: FormEvent) => void
}

const LoginView = (props: IProps) => {
    return (
        <form onSubmit={(e) => props.handleSubmit(e)}>
            <h1>Login</h1>
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
                            <input type="submit" value="Sumbit" className="btn btn-primary" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default LoginView;