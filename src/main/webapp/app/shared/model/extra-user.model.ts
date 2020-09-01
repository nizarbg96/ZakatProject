import { IBeneficiary } from 'app/shared/model/beneficiary.model';
import { IZakat } from 'app/shared/model/zakat.model';
import { IPeriod } from 'app/shared/model/period.model';

export interface IExtraUser {
  id?: number;
  bankAccountId?: number;
  userId?: number;
  beneficiarys?: IBeneficiary[];
  zakats?: IZakat[];
  periods?: IPeriod[];
}

export class ExtraUser implements IExtraUser {
  constructor(
    public id?: number,
    public bankAccountId?: number,
    public userId?: number,
    public beneficiarys?: IBeneficiary[],
    public zakats?: IZakat[],
    public periods?: IPeriod[]
  ) {}
}
