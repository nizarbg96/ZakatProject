import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPeriod } from 'app/shared/model/period.model';
import { IZakat } from 'app/shared/model/zakat.model';
import { ZakatService } from 'app/entities/zakat/zakat.service';
import { AccountService } from 'app/core/auth/account.service';
import { PeriodService } from 'app/entities/period/period.service';
import { BeneficiaryService } from 'app/entities/beneficiary/beneficiary.service';
import { IBeneficiary } from 'app/shared/model/beneficiary.model';
import { UserService } from 'app/core/user/user.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { IPayment, Payment } from 'app/shared/model/payment.model';
import { PaymentService } from 'app/entities/payment/payment.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PayZakatService } from 'app/components/pay-zakat/pay-zakat.service';
import { Account } from 'app/core/user/account.model';

@Component({
  selector: 'jhi-pay-zakat',
  templateUrl: './pay-zakat.component.html',
  styleUrls: ['./pay-zakat.component.scss']
})
export class PayZakatComponent implements OnInit, OnChanges {
  isSaving = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  periods: IPeriod[];
  zakats: IZakat[] = [];
  beneficiaries: IBeneficiary[];
  dataSource: any[];
  selectedZakat: IZakat;
  selectedPeriod: IPeriod;
  selectedBeneficiary: IBeneficiary = null;
  amountToPay: number;
  newBeneficiary = null;
  account: Account | null;

  constructor(
    private _formBuilder: FormBuilder,
    private zakatService: ZakatService,
    private accountService: AccountService,
    private periodService: PeriodService,
    private beneficiaryService: BeneficiaryService,
    private userService: UserService,
    private paymentService: PaymentService,
    private router: Router,
    public dialog: MatDialog,
    private payZakatService: PayZakatService
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [null, Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.compose([Validators.pattern('^[0-9]*'), Validators.required])]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: [this.selectedBeneficiary, Validators.required]
    });
    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
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
          for (let i = 0; i < this.zakats.length; i++) {
            arrayData.push({
              period: this.periods[i],
              zakatId: this.zakats[i].id,
              dueAmount: this.zakats[i].dueAmount,
              remainingAmount: this.zakats[i].remainingAmount
            });
          }
          this.dataSource = arrayData;
        });

        //
      });
      this.beneficiaryService.getAllByLogin(account.login).subscribe(beneficiaries => {
        this.beneficiaries = beneficiaries.body;
      });
    });
    this.payZakatService.closeDialog.subscribe(() => {
      this.beneficiaryService.getAllByLogin(this.account.login).subscribe(beneficiaries => {
        this.beneficiaries = beneficiaries.body;
        this.newBeneficiary = this.beneficiaries[this.beneficiaries.length - 1].id;
        this.selectedBeneficiary = this.beneficiaries[this.beneficiaries.length - 1];
      });
    });
    this.payZakatService.give.subscribe(givenBeneficiary => {
      this.newBeneficiary = givenBeneficiary.id;
      this.selectedBeneficiary = givenBeneficiary;
    });
  }
  getPeriodBeginDate(period: IPeriod) {
    return period.beginDate.format('dddd Do MMMM, YYYY');
  }
  getPeriodEndDate(period: IPeriod) {
    if (period.endDate) return period.endDate.format('dddd Do MMMM, YYYY');
    else return 'now';
  }
  onSelectZakat(zakatId: number) {
    this.zakatService.find(zakatId).subscribe(res => {
      this.selectedZakat = res.body;
      this.selectedPeriod = this.dataSource.slice().filter(data => data.zakatId === zakatId)[0].period;
    });
  }
  onSelectBeneficiary(beneficiaryId: number) {
    this.beneficiaryService.find(beneficiaryId).subscribe(res => {
      this.selectedBeneficiary = res.body;
    });
  }
  save(): void {
    this.isSaving = true;
    const zakat = this.createZakatFromForm();
    this.subscribeToSaveResponse(this.zakatService.update(zakat));
  }
  private createZakatFromForm(): IZakat {
    return {
      ...this.selectedZakat,
      remainingAmount: this.getNewRemainingAmount()
    };
  }
  private createPaymantFromForm(): IPayment {
    return {
      ...new Payment(),
      paymentAmount: this.amountToPay,
      paymentDate: moment(),
      zakatId: this.selectedZakat.id,
      beneficiaryId: this.selectedBeneficiary.id
    };
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IZakat>>): void {
    result.subscribe(
      () => {
        this.onSaveSuccess();
        this.paymentService.create(this.createPaymantFromForm()).subscribe();
      },
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.router.navigate(['zakat']);
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
  getNewRemainingAmount(): number {
    if (this.amountToPay && this.selectedZakat) {
      if (this.amountToPay < this.selectedZakat.remainingAmount) return this.selectedZakat.remainingAmount - this.amountToPay;
      else return 0;
    } else return 0;
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddBeneficiaryDialogComponent, { panelClass: 'custom-dialog-container' });

    dialogRef.afterClosed().subscribe(result => {});
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.payZakatService.give.subscribe(givenBeneficiary => {
      this.newBeneficiary = givenBeneficiary.id;
      this.selectedBeneficiary = givenBeneficiary;
    });
  }
}
@Component({
  selector: 'add-beneficiary-dialog',
  templateUrl: './add-beneficiary-dialog.html'
})
export class AddBeneficiaryDialogComponent implements OnInit {
  constructor(private payZakatService: PayZakatService, public dialogRef: MatDialogRef<AddBeneficiaryDialogComponent>) {}
  close() {
    this.payZakatService.closeDialog.next();
    this.dialogRef.close();
  }
  ngOnInit(): void {
    const element = <HTMLScriptElement>document.getElementsByClassName('custom-dialog-container')[0];
    element.style.maxWidth = '100vw';
  }
}
