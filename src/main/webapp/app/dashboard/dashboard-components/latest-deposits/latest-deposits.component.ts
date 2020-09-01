import { Component, OnInit } from '@angular/core';
import { IBalance } from 'app/shared/model/balance.model';
import { BalanceService } from 'app/entities/balance/balance.service';
import { AccountService } from 'app/core/auth/account.service';

interface BalanceGroup {
  group: string;
  balances: IBalance[];
}
@Component({
  selector: 'jhi-latest-deposits',
  templateUrl: './latest-deposits.component.html',
  styleUrls: ['./latest-deposits.component.scss']
})
export class LatestDepositsComponent implements OnInit {
  NISAB = 11880;
  US = '../../../content/img/flags/US.png';
  DE = '../../../content/img/flags/DE.png';
  AU = '../../../content/img/flags/AU.png';
  GB = '../../../content/img/flags/GB.png';
  RO = '../../../content/img/flags/RO.png';
  BR = '../../../content/img/flags/BR.png';
  balances = new Array<IBalance>(6);
  constructor(private balanceService: BalanceService, private accountService: AccountService) {}

  ngOnInit() {
    this.accountService.getAuthenticationState().subscribe(account => {
      this.balanceService.findAllByLogin(account.login).subscribe(res => {
        const balancesResp: IBalance[] = this.sortBalanceArrayByDate(res.body);
        this.balances = balancesResp;
      });
    });
  }
  sortBalanceArrayByDate(balanceArray: IBalance[]): IBalance[] {
    if (balanceArray) {
      const sortedArray = balanceArray.slice().sort((a, b) => (a.balanceDate < b.balanceDate ? 1 : -1));
      return sortedArray;
    } else {
      return [];
    }
  }
}
