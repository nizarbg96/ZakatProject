import { Moment } from 'moment';
import { IBalance } from 'app/shared/model/balance.model';

export interface IPeriod {
  id?: number;
  beginDate?: Moment;
  endDate?: Moment;
  duration?: number;
  taxable?: boolean;
  zakatId?: number;
  balances?: IBalance[];
  extraUserId?: number;
}

export class Period implements IPeriod {
  constructor(
    public id?: number,
    public beginDate?: Moment,
    public endDate?: Moment,
    public duration?: number,
    public taxable?: boolean,
    public zakatId?: number,
    public balances?: IBalance[],
    public extraUserId?: number
  ) {
    this.taxable = this.taxable || false;
  }
}
