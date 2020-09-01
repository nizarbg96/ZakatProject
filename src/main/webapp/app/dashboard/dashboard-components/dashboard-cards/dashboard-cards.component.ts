import { Component, OnInit } from '@angular/core';
import { IBalance } from 'app/shared/model/balance.model';
import { BalanceService } from 'app/entities/balance/balance.service';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.scss']
})
export class DashboardCardsComponent implements OnInit {
  card2 = '../../../content/images/give-zakat-card.jpeg';
  card1 = '../../../content/images/give-zakat-card.jpg';
  card3 = '../../../content/images/zakat-info-card.jpg';
  balances: IBalance[] = [];
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
