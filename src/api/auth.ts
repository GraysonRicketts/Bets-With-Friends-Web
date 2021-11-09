import { httpInstance  } from "./http";

interface CreateRes {
    token: string;
    displayName: string;
}

interface CreateUserDto {
    displayName: string;
    email: string;
    password: string;
}

export async function createAccount(email: string, username: string , password: string) {
    const res = await httpInstance.post<CreateUserDto, CreateRes>('auth/create', {
        email, displayName: username, password
    });

    return res;
}