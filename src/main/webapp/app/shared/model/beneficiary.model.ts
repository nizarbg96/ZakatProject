import { IPayment } from 'app/shared/model/payment.model';

export interface IBeneficiary {
  id?: number;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  adress?: string;
  otherDetails?: string;
  payments?: IPayment[];
  extraUserId?: number;
}

export class Beneficiary implements IBeneficiary {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public phoneNumber?: string,
    public adress?: string,
    public otherDetails?: string,
    public payments?: IPayment[],
    public extraUserId?: number
  ) {}
}
