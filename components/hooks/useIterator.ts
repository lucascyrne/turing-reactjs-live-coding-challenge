import { useEffect, useState } from "react";
import { UserList, User } from "../../interfaces";

type Iterator = [
  users: UserList,
  user: User,
  isLoading: boolean,
  previous: () => void,
  next: () => void
];

export const useIterator = (url: string): Iterator => {
  const [users, updateUsers] = useState<UserList>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUser = async (): Promise<void> => {
    setIsLoading(true);

    try {
      const response = await fetch("https://randomuser.me/api");
      const _user = await response.json();
      const user = _user.results[0];

      const {
        name: { first, last },
        picture: { thumbnail },
      } = user;

      let numUsers = users.length;
      if (numUsers == -1) numUsers = 0;

      updateUsers([
        ...users,
        { id: numUsers, name: `${first} ${last}`, picture: thumbnail },
      ]);
      setCurrentIndex(numUsers);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const next = (): void => {
    setIsLoading(true);
    let _currentIndex = currentIndex + 1;

    // console.log(`next: ${_currentIndex} < ${users.length}?`);
    if (_currentIndex < users.length) {
      setCurrentIndex(_currentIndex);
      setIsLoading(false);
    }

    // console.log(`next: ${_currentIndex} > ${users.length}?`);
    if (_currentIndex >= users.length) {
      fetchUser();
    }
  };

  const previous = (): void => {
    setIsLoading(true);
    let _currentIndex = currentIndex - 1;

    // console.log(`next: ${_currentIndex} < 0?`);
    if (_currentIndex < 0) {
      setCurrentIndex(users.length - 1);
    } else {
      setCurrentIndex(_currentIndex);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return [users, users[currentIndex], isLoading, previous, next];
};
