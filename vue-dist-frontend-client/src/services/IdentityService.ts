import type { IJWTResponse } from "@/domain/IJWTResponse";
import httpClient from "@/http-client";
import { useIdentityStore } from "@/stores/identity";
import type { AxiosError } from "axios";
import { data } from "jquery";
import type { IServiceResult } from "../domain/IServiceResult";

export class IdentityService {
    identityStore = useIdentityStore();

    async login(email: string, password: string): Promise<IServiceResult<IJWTResponse>> {
        console.log("login");
        try {
            let loginInfo = {
                email, password
            }
            console.log(loginInfo);
            let response = await httpClient.post("/identity/account/login", loginInfo);
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

    async refreshIdentity(): Promise<IServiceResult<IJWTResponse>> {
        try {
            // let tokenInfo = {
            //     email, password
            // }
            let response = await httpClient.post("/identity/account/refreshToken", {
                jwt: this.identityStore.$state.jwt?.token,
                refreshToken:   this.identityStore.$state.jwt?.refreshToken
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
            let response = await httpClient.post("/identity/account/register", regInfo);
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
}