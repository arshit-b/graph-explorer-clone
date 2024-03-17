import {Transaction, User} from 'src/types';
import {v4 as uuidv4} from 'uuid';

export const makeUserObject = (useName: string): User => {
  const address = uuidv4().replace(/-/g, '');
  return {
    name: useName,
    address: `0x-${address}`,
  };
};

export const makeTransactionObject = (
  fromAddress: string,
  toAddress: string,
  amount: number,
): Transaction => {
  const id = uuidv4();
  return {
    id,
    fromAddress,
    toAddress,
    amount,
    createdAt: new Date().getTime(),
  };
};
