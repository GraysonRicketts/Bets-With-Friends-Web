import { httpInstance  } from "./http";

export async function createAccount(email: string, password: string) {

    const ret = await httpInstance.post('/create-account', {
        email, password
    });

    return !!ret;
}