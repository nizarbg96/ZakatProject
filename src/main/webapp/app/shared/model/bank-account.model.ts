import { IBalance } from 'app/shared/model/balance.model';

export interface IBankAccount {
  id?: number;
  bankName?: string;
  bankAdress?: string;
  rib?: number;
  balances?: IBalance[];
  extraUserId?: number;
}

export class BankAccount implements IBankAccount {
  constructor(
    public id?: number,
    public bankName?: string,
    public bankAdress?: string,
    public rib?: number,
    public balances?: IBalance[],
    public extraUserId?: number
  ) {}
}
