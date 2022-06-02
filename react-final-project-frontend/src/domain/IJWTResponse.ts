export interface IJWTResponse {
    email: string,
    firstName: string,
    lastName: string,
    token: string,
    refreshToken: string;
    appUserId: string
}