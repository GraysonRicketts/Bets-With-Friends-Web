import { httpInstance } from './api';
import { AxiosResponse } from 'axios';

export const getScore = async () => {
  const res = await httpInstance.get<AxiosResponse<number>>('score');

  return res.data;
};
