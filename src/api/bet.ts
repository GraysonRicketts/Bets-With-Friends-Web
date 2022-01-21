import { AxiosResponse } from 'axios';
import { httpInstance } from './api';

export interface Wager {
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
}

export interface Option {
  id: string;
  name: string;
  isFinalOption: boolean;
}

export interface Bet {
  title: string;
  category: {
    id: string;
    name: string;
  } | null;
  wagers: Wager[];
  options: Option[];
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

interface AddWagerDto {
  betId: string;
  optionId: string;
  amount: number;
}

export const addWager = async (dto: AddWagerDto) => {
  const res = await httpInstance.post<CreateBetDTO, AxiosResponse<Wager>>(
    'bet/wager',
    dto,
  );

  return res.data;
};

interface FinalizeBetDto {
  betId: string;
  winningOptionId: string;
}
export const closeBet = async (dto: FinalizeBetDto) => {
  const res = await httpInstance.post<FinalizeBetDto, AxiosResponse<Bet>>(
    'bet/finalize',
    dto,
  );

  return res.data;
};

export const deleteBet = async (id: string) => {
  const res = await httpInstance.delete<AxiosResponse>(`bet/${id}`);

  return res.data;
};
