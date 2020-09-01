import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IBalance } from 'app/shared/model/balance.model';
import { IBeneficiary } from 'app/shared/model/beneficiary.model';
import { BeneficiaryService } from 'app/entities/beneficiary/beneficiary.service';
import { IPayment } from 'app/shared/model/payment.model';
import { AccountService } from 'app/core/auth/account.service';
import { PaymentService } from 'app/entities/payment/payment.service';

@Component({
  selector: 'jhi-beneficiaries-table',
  templateUrl: './beneficiaries-table.component.html',
  styleUrls: ['./beneficiaries-table.component.scss']
})
export class BeneficiariesTableComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'adress', 'givenAmount', 'details'];
  dataSource = new MatTableDataSource<IBeneficiary>([]);
  payments: IPayment[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Output() beneficiaryWasSelected = new EventEmitter<IBeneficiary>();

  constructor(
    private beneficiaryService: BeneficiaryService,
    private accountService: AccountService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.accountService.getAuthenticationState().subscribe(account => {
      this.beneficiaryService.getAllByLogin(account.login).subscribe(res => {
        const benefeciaries = res.body;
        this.paymentService.findAllByLogin(account.login).subscribe(res => {
          const payments: IPayment[] = res.body;
          const paymentsAmountes: number[] = [];
          let j = 0;
          benefeciaries.forEach(benfeciary => {
            let sum = 0;
            payments
              .slice()
              .filter(payment => payment.beneficiaryId === benfeciary.id)
              .map(payment => payment.paymentAmount)
              .forEach(amount => {
                sum = sum + amount;
              });
            benefeciaries[j].extraUserId = sum;
            j = j + 1;
            paymentsAmountes.push(sum);
          });
          let i = 0;
          benefeciaries.sort((a, b) => (a.extraUserId < b.extraUserId ? 1 : -1));
          this.dataSource = new MatTableDataSource<IBeneficiary>(benefeciaries);
          this.dataSource.paginator = this.paginator;
        });
      });
    });
  }
  onSelectBeneficiary(element: IBeneficiary) {
    this.beneficiaryWasSelected.emit(element);
  }
}
