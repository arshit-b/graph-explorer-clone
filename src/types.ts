export type User = {
  name: string;
  address: string;
};

export type Transaction = {
  id: string;
  sourceAddress: string;
  targetAddress: string;
  amount: number;
  createdAt: number;
};
