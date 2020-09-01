import { Injectable } from '@angular/core';
import { PeriodService } from 'app/entities/period/period.service';
import { BalanceService } from 'app/entities/balance/balance.service';
import { IPeriod, Period } from 'app/shared/model/period.model';
import { Observable, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { IBalance } from 'app/shared/model/balance.model';
import { HttpResponse } from '@angular/common/http';
import { Account } from 'app/core/user/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { UserService } from 'app/core/user/user.service';
import { ExtraUserService } from 'app/entities/extra-user/extra-user.service';
import { ExtraUser, IExtraUser } from 'app/shared/model/extra-user.model';
export const NISAB: number = 11880;

@Injectable({
  providedIn: 'root'
})
export class AddBalanceService {
  account: Account | null = null;
  subsc: Subscription;

  constructor(
    private periodService: PeriodService,
    private balanceService: BalanceService,
    private datePipe: DatePipe,
    private accountService: AccountService,
    private userService: UserService,
    private extraUserService: ExtraUserService
  ) {}

  addBalance(balance: IBalance, userId: number, userLogin: String) {
    this.subsc = this.periodService.findLatest(userLogin).subscribe(
      latestPeriod => {
        const period: IPeriod = latestPeriod.body;
        if (balance.balanceDate > period.beginDate) {
          ////
          ///
          //adding new balance
          this.periodService.updatePeriodsByBalanceInput(balance, 'new', userLogin).subscribe();
        } else {
          //adding an old balance
          this.periodService.updatePeriodsByBalanceInput(balance, 'old', userLogin).subscribe();
        }
      },
      error => {
        //no lastPeriod
        if (balance.balanceAmount > NISAB) {
          //create new period and assign it to the balance
          const period = { ...new Period(), beginDate: balance.balanceDate, taxable: false, extraUserId: userId };
          this.addNewPeriod(this.periodService.create(period), balance);
        }
      }
    );
  }
  addNewPeriod(result: Observable<HttpResponse<IPeriod>>, balance: IBalance) {
    result.subscribe(res => {
      const resPeriod: IPeriod = res.body;
      const balanceToUpdate: IBalance = { ...balance, periodId: resPeriod.id };
      this.assignPeriodToBalance(this.balanceService.update(balanceToUpdate));
    });
  }

  assignPeriodToBalance(result: Observable<HttpResponse<IBalance>>) {
    result.subscribe();
  }

  addBalanceAfterGettingUserIdByAccountLogin(result: Observable<Account | null>, balance: IBalance) {
    result.subscribe(account => {
      this.subscribeToGetUserId(this.extraUserService.findByLogin(account.login), balance, account.login);
    });
  }
  subscribeToGetUserId(result: Observable<HttpResponse<IExtraUser>>, balance: IBalance, userLogin: String) {
    result.subscribe(user => {
      const extraUser: ExtraUser = user.body;
      this.addBalance(balance, extraUser.id, userLogin);
    });
  }
}
