import { Moment } from 'moment';

export interface IBalance {
  id?: number;
  balanceAmount?: number;
  balanceDate?: Moment;
  bankAccountId?: number;
  periodId?: number;
}

export class Balance implements IBalance {
  constructor(
    public id?: number,
    public balanceAmount?: number,
    public balanceDate?: Moment,
    public bankAccountId?: number,
    public periodId?: number
  ) {}
}
