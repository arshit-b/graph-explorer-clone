export type User = {
  name: string;
  address: string;
};


export type Transaction = {
  id: string;
  fromAddress: string;
  toAddress: string;
  amount: number;
  createdAt: number;
}
