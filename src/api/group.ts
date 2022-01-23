import { AxiosResponse } from 'axios';
import { Bet, Category } from './bet';
import { httpInstance } from './api';

interface CreateGroupDto {
  name: string;
  members?: string[];
}
export async function createGroup(dto: CreateGroupDto) {
  const res = await httpInstance.post<CreateGroupDto>('group', dto);

  return res.data;
}

export interface Group {
  name: string;
  userGroups: {
    id: string;
    user: {
      id: string;
      displayName: string;
      email: string;
      score: number;
      version: number;
    };
    role: typeof PrivelegeLevel;
  }[];
  id: string;
}
const PrivelegeLevel = {
  OWNER: 'OWNER',
  ADD_MEMBER: 'ADD_MEMBER',
  ADD_BET: 'ADD_BET',
};
export async function getGroups() {
  const res = await httpInstance.get<Group[]>('group');

  return res.data;
}

export interface GroupWithBet extends Group {
  bets: Bet[];
  categories: Category[];
}
export async function getGroupWithBet(id: string) {
  const res = await httpInstance.get<GroupWithBet>(`group/${id}`);

  return res.data;
}

export interface AddMemberDto {
  groupId: string;
  members: string[];
}
export async function addMemberToGroup(groupId: string, userId: string) {
  const res = await httpInstance.post<
    AddMemberDto,
    AxiosResponse<GroupWithBet>
  >('group/add-member', {
    groupId,
    members: [userId],
  });

  return res.data;
}
