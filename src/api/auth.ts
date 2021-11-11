import { AuthTokens } from "../app/auth/token.provider";
import { httpInstance  } from "./http";

interface LoginRes {
    id: string;
    accessToken: string;
    displayName: string;
}

interface LoginDto {
    displayName: string;
    email: string;
    password: string;
}

export async function login(email: string, password: string) {
    const res = await httpInstance.post<LoginDto, LoginRes>('auth/login', {
        email, password
    });

    return res;
}

interface CreateUserDto {
    displayName: string;
    email: string;
    password: string;
}

export async function createAccount(email: string, username: string , password: string) {
    const res = await httpInstance.post<CreateUserDto, LoginRes>('auth/create', {
        email, displayName: username, password
    });

    return res;
}

export async function updateToken(refreshToken: string) {
    const res = await httpInstance.post<string, AuthTokens>('auth/update-token',
        refreshToken
    );

    return res;
}

