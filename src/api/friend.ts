import { AxiosResponse } from "axios";
import { AuthTokens } from "../app/auth/token.provider";
import { httpInstance  } from "./http";
import { UserDto } from "./user";

interface AddFriendDto {
    email: string;
}

export async function addFriend(email: string) {
    const res = await httpInstance.post<AddFriendDto, AxiosResponse<UserDto>>('friend', {
        email
    });

    return res.data;
}