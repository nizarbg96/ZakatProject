import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IBeneficiary } from 'app/shared/model/beneficiary.model';

@Injectable({
  providedIn: 'root'
})
export class PayZakatService {
  closeDialog = new Subject<void>();
  closeDialog2 = new Subject<void>();
  give = new Subject<IBeneficiary>();
  constructor() {}
}
