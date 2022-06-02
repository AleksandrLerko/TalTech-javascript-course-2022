import type { AxiosError } from "axios";
import { data } from "jquery";
import { useContext } from "react";
import { IJWTResponse } from "../domain/IJWTResponse";
import type { IServiceResult } from "../domain/IServiceResult";
import { IUser } from "../domain/IUser";
import { JWTContext } from "../state/identities/JWTContext";
import httpClient from "./HttpClient";

export class IdentityService {
    private jwtContext = useContext(JWTContext);

    async login(email: string, password: string): Promise<IServiceResult<IJWTResponse>> {
        console.log("login");
        try {
            let loginInfo = {
                email, password
            }
            let response = await httpClient.post("/v1.0/identity/account/login", loginInfo);
            return {
                status: response.status,
                data: response.data as IJWTResponse
            };
        } catch (e) {
            console.log("logging error")
            let response = {
                status: (e as AxiosError<any, any>).response!.status,
                errorMsg: "User/Password problem"
            }
            return response;
        }
    }

    async refreshIdentity(): Promise<IServiceResult<IJWTResponse>> {
        try {
            // let tokenInfo = {
            //     email, password
            // }
            let response = await httpClient.post("/v1.0/identity/account/refreshToken", {
                jwt: this.jwtContext.jwtResponse?.token as string,
                refreshToken: this.jwtContext.jwtResponse?.refreshToken as string
            });
            return {
                status: response.status,
                data: response.data as IJWTResponse
            };
        } catch (e) {
            let response = {
                status: (e as AxiosError<any, any>).response!.status,
                errorMsg: (e as AxiosError<any, any>).response!.data.error,
            }
            return response;
        }
    }

    async registerUser(
        email: string,
        password: string,
        firstName: string,
        lastName: string): Promise<IServiceResult<IJWTResponse>> {
        console.log("register user")
        try {
            let regInfo = {
                email, password, firstName, lastName
            }
            let response = await httpClient.post("/v1.0/identity/account/register", regInfo);
            return {
                status: response.status,
                data: response.data as IJWTResponse
            };
        } catch (e) {
            let response = {
                status: (e as AxiosError<any, any>).response!.status,
                errorMsg: "Email already registered",
            }
            return response;
        }
    }

    async getUserById(userId: string): Promise<IServiceResult<IUser>> {
        try {
            let response = await httpClient.get(`/v1.0/identity/account/getuserbyid/${userId}`, {
                headers: {
                    "Authorization": "bearer " + this.jwtContext.jwtResponse?.token
                }
            });

            return {
                status: response.status,
                data: response.data as IUser
            };
        } catch (e) {
            console.log("error")
            let response = (e as AxiosError).response!;
            if (response.status == 401 && this.jwtContext.jwtResponse?.refreshToken) {
                let refreshToken = await this.refreshIdentity()
                this.jwtContext.jwtResponse = refreshToken.data!;

                if (!this.jwtContext.jwtResponse?.token) {
                    return {
                        status: (e as AxiosError<any, any>).response!.status,
                        errorMsg: (e as AxiosError<any, any>).response!.data.error,
                    };
                }


                let res = await httpClient.get(`/v1.0/identity/account/getuserbyid/${userId}`, {
                    headers: {
                        "Authorization": "bearer " + this.jwtContext.jwtResponse?.token
                    }
                });
                console.log(response);
                // let res = response.data as TEntity[];
                return {
                    status: response.status,
                    data: res.data as IUser};
            }
        }

        return {
            status: 404,
            errorMsg: "Not found"
        }
    }

}