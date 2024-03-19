import React, {createContext, useCallback, useContext, useState} from 'react';
import {Transaction, User} from 'src/types';
import {makeTransactionObject, makeUserObject} from 'src/utils';

type DataProviderValue = {
  userList: User[];
  registerNewUser: (user: User) => void;
  transactions: Transaction[];
  registerTransaction: (transaction: Transaction) => void;
  cachedImages: {
    [uri: string]: HTMLImageElement;
  };
  cacheImage: (uri: string, image: HTMLImageElement) => void;
};

const Context = createContext<DataProviderValue | null>(null);

const initialUsers: User[] = [
  {
    name: 'Arshit',
    imageUri:
      'https://images.unsplash.com/photo-1707150158138-e346fa3914b8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDg2MjA5MA&ixlib=rb-4.0.3&q=80&w=100',
  },
  {
    name: 'Harsh',
    imageUri:
      'https://images.unsplash.com/photo-1709038459444-6f0f65994fe8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDg2MzM1NQ&ixlib=rb-4.0.3&q=80&w=100',
  },
  {
    name: 'Hardik',
    imageUri:
      'https://images.unsplash.com/photo-1707827915006-1dc90407bd6f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDg2MzM3NQ&ixlib=rb-4.0.3&q=80&w=100',
  },
  {
    name: 'Tirth',
    imageUri:
      'https://images.unsplash.com/photo-1709038459415-8379ce8ae789?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDg2MzM1Ng&ixlib=rb-4.0.3&q=80&w=100',
  },
  {
    name: 'Raj',
    imageUri:
      'https://images.unsplash.com/photo-1708613184190-632b4c8768ec?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDg2MzM5OQ&ixlib=rb-4.0.3&q=80&w=100',
  },
  {
    name: '0xPPL',
    imageUri:
      'https://images.unsplash.com/photo-1708247899914-db888e0ce29a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDg2MzQxMw&ixlib=rb-4.0.3&q=80&w=100',
  },
  {
    name: 'Praveen',
    imageUri:
      'https://images.unsplash.com/photo-1707833558984-3293e794031c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDg3NzUyOQ&ixlib=rb-4.0.3&q=80&w=100',
  },
  {
    name: 'Karan',
    imageUri:
      'https://images.unsplash.com/photo-1709920680220-8ee257262056?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDg3NzQ1Nw&ixlib=rb-4.0.3&q=80&w=100',
  },
  {
    name: 'Dhruv',
    imageUri:
      'https://images.unsplash.com/photo-1709423377982-fbe2169e5b67?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDg3NzQyMQ&ixlib=rb-4.0.3&q=80&w=100',
  },
].map(({name, imageUri}) => makeUserObject(name, imageUri));

const initialTransactions = [
  makeTransactionObject(initialUsers[0].address, initialUsers[6].address, 923),
  makeTransactionObject(
    initialUsers[0].address,
    initialUsers[7].address,
    9423,
  ),
  makeTransactionObject(
    initialUsers[0].address,
    initialUsers[8].address,
    9423,
  ),
  makeTransactionObject(
    initialUsers[1].address,
    initialUsers[0].address,
    3423,
  ),
  makeTransactionObject(
    initialUsers[2].address,
    initialUsers[1].address,
    23432,
  ),
  makeTransactionObject(initialUsers[3].address, initialUsers[1].address, 434),
  makeTransactionObject(
    initialUsers[3].address,
    initialUsers[2].address,
    23343,
  ),
  makeTransactionObject(
    initialUsers[4].address,
    initialUsers[1].address,
    232433,
  ),
  makeTransactionObject(
    initialUsers[5].address,
    initialUsers[2].address,
    25633,
  ),
];

const cachedImages: {
  [uri: string]: HTMLImageElement;
} = {};

const cacheImage = (uri: string, image: HTMLImageElement) => {
  cachedImages[uri] = image;
};

const DataProvider = ({children}: React.PropsWithChildren) => {
  const [userList, setUseList] = useState<User[]>(initialUsers);
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  const registerNewUser = useCallback(
    (user: User) => {
      setUseList((prevUserList) => [user, ...prevUserList]);
    },
    [setUseList],
  );

  const registerTransaction = useCallback(
    (transaction: Transaction) => {
      setTransactions((prevTransaction) => [...prevTransaction, transaction]);
    },
    [setTransactions],
  );
  return (
    <Context.Provider
      value={{
        userList,
        transactions,
        registerNewUser,
        registerTransaction,
        cachedImages,
        cacheImage,
      }}>
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
