import axios from "axios";

export const httpClient = axios.create({
    baseURL: "https://allerk-dist22-backend.azurewebsites.net/api",
    headers: {
        "Content-type": "application/json"
    }
});

export default httpClient;
