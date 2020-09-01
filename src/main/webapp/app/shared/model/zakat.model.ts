import { IPayment } from 'app/shared/model/payment.model';

export interface IZakat {
  id?: number;
  dueAmount?: number;
  remainingAmount?: number;
  payments?: IPayment[];
  periodId?: number;
  extraUserId?: number;
}

export class Zakat implements IZakat {
  constructor(
    public id?: number,
    public dueAmount?: number,
    public remainingAmount?: number,
    public payments?: IPayment[],
    public periodId?: number,
    public extraUserId?: number
  ) {}
}
