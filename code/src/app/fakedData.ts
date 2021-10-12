import { Bet, Group, User, Wager, Option, Category } from '../interfaces';

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

const footballCategory: Category = {
  id: '123',
  name: 'Football',
};
export const fakedBets: Bet[] = [
  {
    id: '123',
    title: 'Nagy is sacked',
    options: fakedOptions,
    isOpen: true,
    wagers: fakedWagers,
    category: footballCategory,
  },
  {
    id: '234',
    title: 'Will rain tomorrow',
    options: fakedOptions,
    isOpen: true,
    wagers: [fakedWagers[1]],
  },
  {
    id: '345',
    title: 'Katie rocks',
    options: fakedOptions,
    isOpen: false,
    wagers: fakedWagers,
    outcome: fakedOptions[0],
  },
];

export const fakedGroup: Group = {
  id: '123',
  name: 'Bears boys',
  members: fakedMembers,
  bets: fakedBets,
};
