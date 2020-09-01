import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AccountService } from 'app/core/auth/account.service';
import { PaymentService } from 'app/entities/payment/payment.service';
import { IPayment } from 'app/shared/model/payment.model';
import { IPeriod } from 'app/shared/model/period.model';
import { PeriodService } from 'app/entities/period/period.service';

@Component({
  selector: 'jhi-beneficiary-payments-table',
  templateUrl: './beneficiary-payments-table.component.html',
  styleUrls: ['./beneficiary-payments-table.component.scss']
})
export class BeneficiaryPaymentsTableComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['paymentAmount', 'paymentDate', 'zakatPeriod'];
  dataSource = new MatTableDataSource<PaymentWithPeriod>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() beneficiaryId: number;
  payments: IPayment[] = [];
  periods: IPeriod[] = [];

  constructor(private accountService: AccountService, private paymentService: PaymentService, private periodService: PeriodService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.payments = [];
    this.periods = [];
    this.dataSource.paginator = this.paginator;
    this.accountService.getAuthenticationState().subscribe(account => {
      this.paymentService.findAllByLogin(account.login).subscribe(res => {
        const payments: IPayment[] = res.body;
        this.payments = payments.filter(payment => payment.beneficiaryId === this.beneficiaryId);
        this.periodService.findAllTaxablePeriods(account.login, 'true').subscribe(periods => {
          const periodsBody: IPeriod[] = periods.body;
          payments.forEach(payment => {
            periodsBody.forEach(period => {
              if (payment.zakatId === period.zakatId) this.periods.push(period);
            });
          });
          const arrayData: PaymentWithPeriod[] = [];
          for (var i = 0; i < this.payments.length; i++) {
            arrayData.push({
              payment: this.payments[i],
              period: this.periods[i]
            });
          }
          this.dataSource = new MatTableDataSource<PaymentWithPeriod>(arrayData);
        });
      });
    });
  }
}
export interface PaymentWithPeriod {
  payment: IPayment;
  period: IPeriod;
}
