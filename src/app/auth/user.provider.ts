import { User } from '../../interfaces';


const USER_KEY = 'USER';
export const createUserProvider = () => {
  const storedUser = localStorage.getItem(USER_KEY);
  let _user: User | null = storedUser && JSON.parse(storedUser);

  const setUser = (user: User | null) => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
    _user = user;
  };

  const getUser = () => {
    if (!_user) {
      return null;
    }

    return _user;
  };

  const isLoggedIn = () => {
    return !!_user;
  };

  return {
    getUser,
    isLoggedIn,
    setUser,
  };
};
