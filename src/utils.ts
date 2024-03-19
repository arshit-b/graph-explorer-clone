import {Transaction, User} from 'src/types';
import {v4 as uuidv4} from 'uuid';

export const makeUserObject = (useName: string, imageUri: string): User => {
  const address = uuidv4().replace(/-/g, '');
  return {
    name: useName,
    address: `0x-${address}`,
    imageUri,
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
    sourceAddress: fromAddress,
    targetAddress: toAddress,
    amount,
    createdAt: new Date().getTime(),
  };
};

export const getRandomImageUri = async () => {
  try {
    let response = await fetch(
      'https://random.imagecdn.app/v1/image?width=100&height=100',
    );
    if (!response.ok) {
      return null;
    }
    return response.text();
  } catch (e) {
    return null;
  }
};
