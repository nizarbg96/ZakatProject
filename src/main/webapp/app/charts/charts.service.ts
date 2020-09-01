import { Injectable } from '@angular/core';
import { Account } from 'app/core/user/account.model';
import { BalanceService } from 'app/entities/balance/balance.service';
import { AccountService } from 'app/core/auth/account.service';
import { IBalance } from 'app/shared/model/balance.model';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import arrayContaining = jasmine.arrayContaining;

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  account: Account | null = null;
  balancesData: number[] = [];
  constructor(private balanceService: BalanceService, private accountService: AccountService) {}

  getBalances(): Observable<IBalance[] | null> {
    this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    if (this.account) {
      return this.balanceService.findAllByLogin(this.account.login).pipe(
        map(res => {
          return res.body;
        })
      );
    } else {
      return of([]);
    }
  }

  sortBalanceArrayByDate(balanceArray: IBalance[]): IBalance[] {
    if (balanceArray) {
      const sortedArray = balanceArray.slice().sort((a, b) => (a.balanceDate > b.balanceDate ? 1 : -1));
      return sortedArray;
    } else {
      return [];
    }
  }
  convertData(data: IBalance[]): number[] {
    const output: number[] = [];

    data.forEach(val => {
      if (val.balanceAmount != null) {
        output.push(val.balanceAmount);
      }
    });

    return output;
  }
}
