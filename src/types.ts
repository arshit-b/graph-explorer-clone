export type User = {
  name: string;
  address: string;
  imageUri: string;
};

export type Transaction = {
  id: string;
  sourceAddress: string;
  targetAddress: string;
  amount: number;
  createdAt: number;
};
