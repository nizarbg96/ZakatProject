import { Moment } from 'moment';

export interface IPayment {
  id?: number;
  paymentAmount?: number;
  paymentDate?: Moment;
  zakatId?: number;
  beneficiaryId?: number;
}

export class Payment implements IPayment {
  constructor(
    public id?: number,
    public paymentAmount?: number,
    public paymentDate?: Moment,
    public zakatId?: number,
    public beneficiaryId?: number
  ) {}
}
