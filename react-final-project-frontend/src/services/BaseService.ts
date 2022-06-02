import { AxiosError } from "axios";
import { useContext } from "react";
import { IError } from "../domain/IError";
import { IJWTResponse } from "../domain/IJWTResponse";
import { IServiceResult } from "../domain/IServiceResult";
import { JWTContext } from "../state/identities/JWTContext";
import httpClient from "./HttpClient";
import { IdentityService } from "./IdentityService";

export class BaseService<TEntity> {

    public jwtContext = useContext(JWTContext);
    public identityService = new IdentityService();

    constructor(private path: string) {
    }

    async getAll(): Promise<IServiceResult<TEntity[]>> {
        // console.log("get");
        try {
            let response = await httpClient.get(`/v1.0/${this.path}`, {
                headers: {
                    "Authorization": "bearer " + this.jwtContext.jwtResponse?.token
                }
            });
            // console.log(response);
            let res = response.data as TEntity[];
            return {
                status: response.status,
                data: response.data as TEntity[]
            };
        } catch (e) {
            console.log("error")
            let response = (e as AxiosError).response!;
            if (response.status == 401 && this.jwtContext.jwtResponse?.refreshToken) {
                let refreshToken = await this.identityService.refreshIdentity()
                let jwtResponse: IJWTResponse = {
                    email: refreshToken.data?.email as string,
                    firstName: refreshToken.data?.firstName as string,
                    lastName: refreshToken.data?.lastName as string,
                    appUserId: refreshToken.data?.appUserId as string,
                    token: refreshToken.data?.token as string,
                    refreshToken: refreshToken.data?.refreshToken as string
                }

                this.jwtContext.jwtResponse = jwtResponse;

                if (!this.jwtContext.jwtResponse?.token) {
                    return {
                        status: (e as AxiosError<any, any>).response!.status,
                        errorMsg: (e as AxiosError<any, any>).response!.data.error,
                    };
                }


                let res = await httpClient.get(`/v1.0/${this.path}`, {
                    headers: {
                        "Authorization": "bearer " + this.jwtContext.jwtResponse?.token
                    }
                });
                console.log(response);
                return {
                    status: response.status,
                    data: res.data as TEntity[]};
            }
        }
        return {
            status: 404,
            errorMsg: "Not found"
        };
    }

    async getById(id: string): Promise<IServiceResult<TEntity>> {
        console.log("get by id");
        try {
            let response = await httpClient.get(`/v1.0/${this.path}/${id}?culture=en-GB`, {
                headers: {
                    "Authorization": "bearer " + this.jwtContext.jwtResponse?.token
                }
            });
            console.log(response);
            return {
                status: response.status,
                data: response.data as TEntity
            };
        } catch (e) {
            console.log("error")
            let response = (e as AxiosError).response!;
            if (response.status == 401 && this.jwtContext.jwtResponse?.refreshToken) {
                let refreshToken = await this.identityService.refreshIdentity()
                let jwtResponse: IJWTResponse = {
                    email: refreshToken.data?.email as string,
                    firstName: refreshToken.data?.firstName as string,
                    lastName: refreshToken.data?.lastName as string,
                    appUserId: refreshToken.data?.appUserId as string,
                    token: refreshToken.data?.token as string,
                    refreshToken: refreshToken.data?.refreshToken as string
                }

                this.jwtContext.jwtResponse = jwtResponse;

                if (!this.jwtContext.jwtResponse?.token) {
                    return {
                        status: (e as AxiosError<any, any>).response!.status,
                        errorMsg: (e as AxiosError<any, any>).response!.data.error,
                    };
                }


                let res = await httpClient.get(`/v1.0/${this.path}/${id}?culture=en-GB`, {
                    headers: {
                        "Authorization": "bearer " + this.jwtContext.jwtResponse?.token
                    }
                });
                console.log(response);
                return {
                    status: response.status,
                    data: res.data as TEntity};
            }
        }

        return {
            status: 404,
            errorMsg: "Not found"
        }
    }

    
    async add(entity: TEntity): Promise<IServiceResult<TEntity>> {
        console.log("add");
        let response;
        try {
            console.log(entity)
            response = await httpClient.post(`/v1.0/${this.path}/`, entity, {
                headers: {
                    "Authorization": "bearer " + this.jwtContext.jwtResponse?.token
                }
            });
            console.log(response)
            return {
                status: response.status,
                data: response.data
            }
        } catch (e) {
            let response = (e as AxiosError).response!;
            if (response.status === 401 && this.jwtContext.jwtResponse?.refreshToken) {
                let refreshToken = await this.identityService.refreshIdentity()
                let jwtResponse: IJWTResponse = {
                    email: refreshToken.data?.email as string,
                    firstName: refreshToken.data?.firstName as string,
                    lastName: refreshToken.data?.lastName as string,
                    appUserId: refreshToken.data?.appUserId as string,
                    token: refreshToken.data?.token as string,
                    refreshToken: refreshToken.data?.refreshToken as string
                }

                this.jwtContext.jwtResponse = jwtResponse;

                if (!this.jwtContext.jwtResponse?.token) {
                    return {
                        status: (e as AxiosError<any, any>).response!.status,
                        errorMsg: (e as AxiosError<any, any>).response!.data.error,
                    };
                }

                let resonseAgain = await httpClient.post(`/v1.0/${this.path}/`, entity, {
                    headers: {
                        "Authorization": "bearer " + this.jwtContext.jwtResponse?.token
                    }
                });
                
                return {
                    status: resonseAgain.status
                }

            }
            let res = {
                status: (e as AxiosError<any, any>).response!.status,
                errorMsg: (e as AxiosError<any, any>).response!.data.error,
            }
            return res;
        }
        return { status: response.status };
    }

    async put(entity: TEntity, id: string): Promise<IServiceResult<TEntity>> {
        console.log("put");
        let response;
        try {
            response = await httpClient.put(`/v1.0/${this.path}/${id}`, entity, {
                headers: {
                    "Authorization": "bearer " + this.jwtContext.jwtResponse?.token
                }
            });

            console.log(response)
            return {
                status: response.status,
                data: response.data
            }
        } catch (e) {
            console.log("in error")
            let response = (e as AxiosError).response!;
            if (response.status === 401 && this.jwtContext.jwtResponse?.refreshToken) {
                let refreshToken = await this.identityService.refreshIdentity()
                let jwtResponse: IJWTResponse = {
                    email: refreshToken.data?.email as string,
                    firstName: refreshToken.data?.firstName as string,
                    lastName: refreshToken.data?.lastName as string,
                    appUserId: refreshToken.data?.appUserId as string,
                    token: refreshToken.data?.token as string,
                    refreshToken: refreshToken.data?.refreshToken as string
                }

                this.jwtContext.jwtResponse = jwtResponse;

                if (!this.jwtContext.jwtResponse?.token) {
                    return {
                        status: (e as AxiosError<any, any>).response!.status,
                        errorMsg: (e as AxiosError<any, any>).response!.data.error,
                    };
                }

                let responseAgain = await httpClient.put(`/v1.0/${this.path}/${id}`, entity, {
                    headers: {
                        "Authorization": "bearer " + this.jwtContext.jwtResponse?.token
                    }
                });
                
                return {
                    status: responseAgain.status
                }

            }
            let res = {
                status: (e as AxiosError<any, any>).response!.status,
                errorMsg: (e as AxiosError<any, any>).response!.data.error,
            }
            return res;
        }
        return { status: response.status };
    }

    // async getByIdNOLang(id: string): Promise<TEntity> {
    //     console.log("get by id");
    //     let response = await httpClient.get(`/v1.0/${this.path}/${id}?culture=en-GB`)
    //     // console.log(response);
    //     let res = response.data as TEntity;
    //     return res;
    // }

}
