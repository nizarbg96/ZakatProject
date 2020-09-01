import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PeriodService } from 'app/entities/period/period.service';
import { BalanceService } from 'app/entities/balance/balance.service';
import { IPeriod } from 'app/shared/model/period.model';
import { AccountService } from 'app/core/auth/account.service';
import { MatSelectChange } from '@angular/material/select';
import { IBalance } from 'app/shared/model/balance.model';
import { Account } from 'app/core/user/account.model';

@Component({
  selector: 'jhi-balances-by-period',
  templateUrl: './balances-by-period.component.html',
  styleUrls: ['./balances-by-period.component.scss']
})
export class BalancesByPeriodComponent implements OnInit {
  displayedColumns: string[] = ['balanceDate', 'balanceAmount'];
  dataSource = new MatTableDataSource<IBalance>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Output() selectionChange: EventEmitter<MatSelectChange>;
  account: Account | null = null;
  periods: IPeriod[];
  @Output() balancesToEmit = new EventEmitter<IBalance[]>();

  constructor(private periodService: PeriodService, private balanceService: BalanceService, private accountService: AccountService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      this.periodService.findAllByloginUser(account.login).subscribe(periods => {
        this.periods = periods.body;
        if (this.periods && this.periods.length >= 1) {
          this.balanceService.findAllByPeriodId1(this.periods[0].id).subscribe(balances => {
            this.dataSource = new MatTableDataSource<IBalance>(balances.body);
            this.dataSource.paginator = this.paginator;
            this.balancesToEmit.emit(balances.body);
          });
        }
      });
    });
  }
  getPeriodBeginDate(period: IPeriod) {
    return period.beginDate.format('dddd Do MMMM, YYYY');
  }
  getPeriodEndDate(period: IPeriod) {
    if (period.endDate) return period.endDate.format('dddd Do MMMM, YYYY');
    else return 'now';
  }
  loadTable(periodId: number) {
    console.log('select event works');
    if (this.account) {
      this.balanceService.findAllByPeriodId1(periodId).subscribe(balances => {
        this.dataSource = new MatTableDataSource<IBalance>(balances.body);
        this.balancesToEmit.emit(balances.body);
        this.dataSource.paginator = this.paginator;
      });
    }
  }
}
