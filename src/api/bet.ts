import { AxiosResponse } from 'axios';
import { httpInstance } from './http';

export interface Bet {
  title: string;
  category: {
    id: string;
    name: string;
  } | null;
  wagers: {
    id: string;
    amount: number;
    option: {
      id: string;
      name: string;
    };
    user: {
      id: string;
      displayName: string;
      version: number;
    };
  }[];
  options: {
    id: string;
    name: string;
    isFinalOption: boolean;
  }[];
  closedAt: Date | null;
  closedBy: {
    id: string;
    displayName: string;
  } | null;
  groupId: string;
  id: string;
}

export interface Category {
  name: string;
  id: string;
}

interface CreateBetDTO {
  groupId: string;
  title: string;
  options: string[];
  category: string | undefined;
  wagerOption: string;
  wagerAmount: number;
}

export const createBet = async (dto: CreateBetDTO) => {
  const res = await httpInstance.post<CreateBetDTO, AxiosResponse<Bet>>(
    'bet',
    dto,
  );

  return res.data;
};
