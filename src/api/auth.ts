import { AxiosResponse } from "axios";
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
    const res = await httpInstance.post<LoginDto, AxiosResponse<LoginRes>>('auth/login', {
        email, password
    });

    return res.data;
}

interface CreateUserDto {
    displayName: string;
    email: string;
    password: string;
}

export async function createAccount(email: string, username: string , password: string) {
    const res = await httpInstance.post<CreateUserDto, AxiosResponse<LoginRes>>('auth/create', {
        email, displayName: username, password
    });

    return res.data;
}

