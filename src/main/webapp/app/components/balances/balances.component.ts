import { Component, OnInit } from '@angular/core';
import { IBalance } from 'app/shared/model/balance.model';
import { BalanceService } from 'app/entities/balance/balance.service';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.scss']
})
export class BalancesComponent implements OnInit {
  balances: IBalance[] = [];
  balances1: IBalance[] = [];
  constructor(private balanceService: BalanceService, private accountService: AccountService) {}

  ngOnInit() {
    this.accountService.getAuthenticationState().subscribe(account => {
      this.balanceService.findAllByLogin(account.login).subscribe(res => {
        const balancesResp: IBalance[] = this.sortBalanceArrayByDate(res.body);
        this.balances1 = balancesResp;
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
