import { AxiosError } from "axios";
import { IPicture } from "../domain/IPicture";
import { BaseService } from "./BaseService";
import httpClient from "./HttpClient";
import { IServiceResult } from "../domain/IServiceResult";

export class PictureService extends BaseService<IPicture>{
    // constructor() {
    //     super("pictures");
    // }

    // async getPictureByProduct(productId: string): Promise<IPicture> {
    //     console.log("get");
    //     let response: IPicture;
    //     try {
    //         let res = await httpClient.get(`/v1.0/pictures/product/${productId}`);
    //         console.log(res)
    //         response = res.data as IPicture;
    //         return response;
    //     } catch (e) {
    //         console.log("error");
    //         // let res = (e as AxiosError).response!;
    //         // if (res.status === 404) {
    //         //     console.log("404")
    //         // }
    //         let error: IServiceResult<void> = {
    //             status: (e as AxiosError<any, any>).response!.status,
    //             errorMsg: (e as AxiosError<any, any>).response!.data
    //         }
    //         console.log(error)
    //         response = {
    //             filePath: ""
    //         }

    //     }
    //     // let response = await httpClient.get(`/v1.0/pictures/product/${productId}`);
    //     // console.log(response);
    //     // let res = response.data as IPicture;
    //     return response;
    // }
}
