import type { ILocation } from "@/domain/ILocation";
import httpClient from "@/http-client";
import BaseService from "./BaseService";

export class LocationService extends BaseService<ILocation> {
    
    constructor() {
        super("locations");
    }
}