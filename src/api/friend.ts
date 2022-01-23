import { AxiosResponse } from 'axios';
import { httpInstance } from './api';
import { User } from './user';

interface AddFriendDto {
  email: string;
}
export async function addFriend(email: string) {
  const res = await httpInstance.post<AddFriendDto, AxiosResponse<User>>(
    'friend',
    {
      email,
    },
  );

  return res.data;
}

export interface FriendRequest {
  userTo: {
    id: string;
    displayName: string;
    email: string;
    score: number;
    version: number;
  };
  userFrom: {
    id: string;
    displayName: string;
    email: string;
    score: number;
    version: number;
  };
  id: string;
  createdAt: Date;
}
export interface FriendRequestsDto {
  to: FriendRequest[];
  from: FriendRequest[];
}
export async function getFriendReqs() {
  const res = await httpInstance.get<FriendRequestsDto>('friend/requests');

  return res.data;
}
export async function acceptFriendReq(requestId: string) {
  const res = await httpInstance.post<FriendRequestsDto>('friend/accept', {
    requestId,
  });

  return res.data;
}

export interface Friend {
  id: string;
  friend: {
    id: string;
    displayName: string;
    email: string;
    score: number;
    version: number;
  };
}
export async function getFriends() {
  const res = await httpInstance.get<Friend[]>('friend');

  return res.data;
}

export async function cancelFriendReq(reqId: string) {
  const res = await httpInstance.delete(`friend/request/${reqId}`);

  return res.data;
}

export async function unfriend(friendId: string) {
  const res = await httpInstance.delete(`friend/${friendId}`);

  return res.data;
}
