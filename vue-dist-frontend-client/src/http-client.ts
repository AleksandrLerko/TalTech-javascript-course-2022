import axios from "axios";

export const httpClient = axios.create({
    baseURL: "https://localhost:7258/api",
    headers: {
        "Content-type": "application/json"
    }
});

export default httpClient;