import { httpInstance } from './http';
import { AxiosResponse } from 'axios';

export const getScore = async () => {
  const res = await httpInstance.get<AxiosResponse<number>>('score');

  return res.data;
};
