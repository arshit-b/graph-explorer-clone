import React, {createContext, useContext, useState} from 'react';
import {Transaction, User} from 'src/types';
import {makeTransactionObject, makeUserObject} from 'src/utils';

type DataProviderValue = {
  userList: User[];
  registerNewUser: (user: User) => void;
  transactions: Transaction[];
  registerTransaction: (transaction: Transaction) => void;
};

const Context = createContext<DataProviderValue | null>(null);

const initialUsers: User[] = [
  'Arshit',
  'Harsh',
  'Hardik',
  'Tirth',
  'Raj',
  '0xPPL',
].map((name) => makeUserObject(name));

const initialTransactions = [
  makeTransactionObject(initialUsers[1].address, initialUsers[0].address, 233),
  makeTransactionObject(initialUsers[2].address, initialUsers[0].address, 233),
  makeTransactionObject(initialUsers[2].address, initialUsers[1].address, 233),
  makeTransactionObject(initialUsers[3].address, initialUsers[0].address, 233),
  makeTransactionObject(initialUsers[3].address, initialUsers[1].address, 233),
  makeTransactionObject(initialUsers[3].address, initialUsers[2].address, 233),
  makeTransactionObject(initialUsers[4].address, initialUsers[1].address, 233),
  makeTransactionObject(initialUsers[5].address, initialUsers[2].address, 233),
];
const DataProvider = ({children}: React.PropsWithChildren) => {
  const [userList, setUseList] = useState<User[]>(initialUsers);
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  const registerNewUser = (user: User) => {
    setUseList((prevUserList) => [user, ...prevUserList]);
  };

  const registerTransaction = (transaction: Transaction) => {
    setTransactions((prevTransaction) => [...prevTransaction, transaction]);
  };
  return (
    <Context.Provider
      value={{userList, transactions, registerNewUser, registerTransaction}}>
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
