import { User, Wager, Option } from '../interfaces';

export const fakedMembers: User[] = [
  {
    id: '123',
    name: 'Jim',
  },
  {
    id: '234',
    name: 'Lauren',
  },
  {
    id: '345',
    name: 'Sue',
  },
  {
    id: '567',
    name: 'Dean',
  },
  {
    id: '678',
    name: 'Kelly',
  },
];

export const fakedOptions: Option[] = [
  { id: '123', name: 'Yes' },
  { id: '234', name: 'No' },
];

export const fakedWagers: Wager[] = [
  { id: '123', option: fakedOptions[0], amount: 20, user: fakedMembers[0] },
  { id: '245', option: fakedOptions[1], amount: 40, user: fakedMembers[1] },
];