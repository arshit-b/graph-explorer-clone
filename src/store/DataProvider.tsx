import React, {createContext, useContext, useState} from 'react';
import {Transaction, User} from 'src/types';
import {makeUserObject} from 'src/utils';

type DataProvider = {
  userList: User[];
  registerNewUser: (user: User) => void;
  transactions: Transaction[];
  registerTransaction: (transaction: Transaction) => void;
};

const Context = createContext<DataProvider | null>(null);

const initialUsers: User[] = [
  'Arshit',
  'Harsh',
  'Hardik',
  'Tirth',
  'Raj',
  '0xPPL',
].map((name) => makeUserObject(name));
const DataProvider = ({children}: React.PropsWithChildren) => {
  const [userList, setUseList] = useState<User[]>(initialUsers);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const registerNewUser = (user: User) => {
    setUseList((prevUserList) => [user, ...prevUserList]);
  };

  const registerTransaction = (transaction: Transaction) => {
    setTransactions((prevTransaction) => [...prevTransaction, transaction]);
  }
  return (
    <Context.Provider value={{userList, transactions, registerNewUser, registerTransaction}}>
      {children}
    </Context.Provider>
  );
};

export const useData = () => {
  const value = useContext(Context);
  if (!value) {
    throw new Error('Can not access data outside DataProvider');
  }
  return value;
};

export default DataProvider;
