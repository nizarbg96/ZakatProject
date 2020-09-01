import { Injectable } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { BankAccountService } from 'app/entities/bank-account/bank-account.service';
import { UserService } from 'app/core/user/user.service';
import { flatMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { IBankAccount } from 'app/shared/model/bank-account.model';
import { HttpResponse } from '@angular/common/http';
import { ExtraUserService } from 'app/entities/extra-user/extra-user.service';
import { ExtraUser } from 'app/shared/model/extra-user.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  closeDialog = new Subject<void>();
  alertsSize = new Subject<number>();
  constructor(
    private accountService: AccountService,
    private bankAccountService: BankAccountService,
    private userService: UserService,
    private extraUserService: ExtraUserService
  ) {}

  loadCurrentBankAccount(): Observable<HttpResponse<IBankAccount>> {
    return this.accountService.getAuthenticationState().pipe(
      flatMap(account => this.extraUserService.findByLogin(account.login)),
      flatMap(user => {
        const extraUser: ExtraUser = user.body;
        return this.bankAccountService.findByUserId(extraUser.id);
      })
    );
  }
}
