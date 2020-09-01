import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IZakat, Zakat } from 'app/shared/model/zakat.model';
import { ZakatService } from 'app/entities/zakat/zakat.service';
import { AccountService } from 'app/core/auth/account.service';
import { IPeriod } from 'app/shared/model/period.model';
import { PeriodService } from 'app/entities/period/period.service';

@Component({
  selector: 'jhi-dashboard-zakat-table',
  templateUrl: './dashboard-zakat-table.component.html',
  styleUrls: ['./dashboard-zakat-table.component.scss']
})
export class DashboardZakatTableComponent implements OnInit {
  displayedColumns: string[] = ['beginDate', 'dueAmount', 'remainingAmount'];
  periods: IPeriod[];
  zakats: IZakat[] = [];
  dataSource: any[];

  constructor(private zakatService: ZakatService, private accountService: AccountService, private periodService: PeriodService) {}

  ngOnInit() {
    this.accountService.getAuthenticationState().subscribe(account => {
      this.periodService.findAllTaxablePeriods(account.login, 'true').subscribe(periods => {
        const periodsBody: IPeriod[] = periods.body;
        this.periods = periodsBody;
        this.zakatService.getZakatByLogin(account.login).subscribe(zakats => {
          const zakatBody: IZakat[] = zakats;
          periodsBody.forEach(period => {
            zakatBody.forEach(zakat => {
              if (period.zakatId === zakat.id) {
                this.zakats.push(zakat);
              }
            });
          });
          const arrayData: any[] = [];
          for (var i = 0; i < this.zakats.length; i++) {
            arrayData.push({
              period: this.periods[i],
              dueAmount: this.zakats[i].dueAmount,
              remainingAmount: this.zakats[i].remainingAmount
            });
          }
          this.dataSource = arrayData;

          console.log(this.dataSource);
        });

        //
      });
    });
  }
}
