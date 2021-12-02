import { httpInstance } from "./http";

interface CreateGroupDto {
    name: string;
    members?: string[];
}

export async function createGroup(dto: CreateGroupDto) {
    const res = await httpInstance.post<CreateGroupDto>('group', dto);
  
    return res.data;
  }