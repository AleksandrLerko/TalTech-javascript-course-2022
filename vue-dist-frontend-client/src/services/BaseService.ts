import httpClient from "@/http-client";
import { useIdentityStore } from "@/stores/identity";
import type { AxiosError } from "axios";
import { IdentityService } from "./IdentityService";
import type { IServiceResult } from "../domain/IServiceResult";

export default class BaseService<TEntity> {
    identityStore = useIdentityStore();

    constructor(private path: string) {

    }
    async getAll(): Promise<TEntity[]> {
        try {
            console.log("get all");
            let response = await httpClient.get(`/${this.path}?culture=en-GB`, {
                headers: {
                    "Authorization": "bearer " + this.identityStore.$state.jwt?.token
                }
            });
            console.log(response);
            let res = response.data as TEntity[];
            return res;
        } catch (e) {
            let respone = (e as AxiosError).response!;
            if (respone.status == 401 && this.identityStore.jwt?.refreshToken) {
                let identityService = new IdentityService();
                let refreshToken = await identityService.refreshIdentity()
                this.identityStore.$state.jwt = refreshToken.data!;

                if (!this.identityStore.$state.jwt) {
                    return [];
                }


                let response = await httpClient.get(`/${this.path}`, {
                    headers: {
                        "Authorization": "bearer " + this.identityStore.$state.jwt?.token
                    }
                });
                console.log(response);
                let res = response.data as TEntity[];
                return res;
            }
        }

        return [];
    }

    async getById(id: string): Promise<TEntity[]> {
        try {
            console.log("get by id");
            let response = await httpClient.get(`/${this.path}/${id}?culture=en-GB`, {
                headers: {
                    "Authorization": "bearer " + this.identityStore.$state.jwt?.token
                }
            });
            console.log(response);
            let res = response.data as TEntity[];
            return res;
        } catch (e) {
            let respone = (e as AxiosError).response!;
            if (respone.status == 401 && this.identityStore.jwt?.refreshToken) {
                let identityService = new IdentityService();
                let refreshToken = await identityService.refreshIdentity()
                this.identityStore.$state.jwt = refreshToken.data!;

                if (!this.identityStore.$state.jwt) {
                    return [];
                }


                let response = await httpClient.get(`/${this.path}/${id}?culture=en-GB`, {
                    headers: {
                        "Authorization": "bearer " + this.identityStore.$state.jwt?.token
                    }
                });
                console.log(response);
                let res = response.data as TEntity[];
                return res;
            }
        }

        return [];
    }

    async add(entity: TEntity): Promise<IServiceResult<void>> {
        console.log("add");
        let response;
        try {
            response = await httpClient.post(`/${this.path}/`, entity, {
                headers: {
                    "Authorization": "bearer " + this.identityStore.$state.jwt?.token
                }
            });
        } catch (e) {
            let res = {
                status: (e as AxiosError<any, any>).response!.status,
                errorMsg: (e as AxiosError<any, any>).response!.data.error,
            }
            return res;
        }
        return { status: response.status };
    }

    async put(entity: TEntity, id: string): Promise<IServiceResult<void>> {
        console.log("put");
        let response;
        try {
            response = await httpClient.put(`/${this.path}/${id}?culture=en-GB`, entity, {
                headers: {
                    "Authorization": "bearer " + this.identityStore.$state.jwt?.token
                }
            });
            console.log(response)
        } catch (e) {
            console.log("in error")
            let res = {
                status: (e as AxiosError<any, any>).response!.status,
                errorMsg: (e as AxiosError<any, any>).response!.data.error,
            }
            return res;
        }
        return { status: response.status };
    }

    async delete(id: string): Promise<IServiceResult<void>> {
        console.log("put");
        let response;
        try {
            response = await httpClient.delete(`/v1.0/${this.path}/${id}`, {
                headers: {
                    "Authorization": "bearer " + this.identityStore.$state.jwt?.token
                }
            });
        } catch (e) {
            let res = {
                status: (e as AxiosError<any, any>).response!.status,
                errorMsg: (e as AxiosError<any, any>).response!.data.error,
            }
            return res;
        }
        return { status: response.status };
    }

}