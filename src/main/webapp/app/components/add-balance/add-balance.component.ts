import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare let f: any;
import '../../../content/js/add-balance.js';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { IBalance, Balance } from 'app/shared/model/balance.model';
import { IBankAccount } from 'app/shared/model/bank-account.model';
import { BankAccountService } from 'app/entities/bank-account/bank-account.service';
import { IPeriod } from 'app/shared/model/period.model';
import { PeriodService } from 'app/entities/period/period.service';
import { AddBalanceService } from 'app/services/add-balance.service';
import { AccountService } from 'app/core/auth/account.service';
import { BalanceService } from 'app/entities/balance/balance.service';
import { Moment } from 'moment';
import { DashboardService } from 'app/dashboard/dashboard.service';

type SelectableEntity = IBankAccount | IPeriod;
const NISAB: number = 11880;

@Component({
  selector: 'jhi-add-balance',
  templateUrl: './add-balance.component.html',
  styleUrls: ['./add-balance.component.scss']
})
export class AddBalanceComponent implements OnInit {
  isSaving = false;
  bankaccounts: IBankAccount[] = [];
  periods: IPeriod[] = [];
  startCalculation = true;
  showStepper = false;
  nisabAmount = NISAB;
  formDone = true;

  editForm = this.fb.group({
    id: [],
    balanceDate: [null, [Validators.required]],
    cashHand: [null, [Validators.required]],
    cashBankAccount: [null, [Validators.required]],
    loan: [null, [Validators.required]],
    moneyFromSale: [null, [Validators.required]],
    gold: [null, [Validators.required]],
    silver: [null, [Validators.required]],
    assetsCash: [null, [Validators.required]],
    receivables: [null, [Validators.required]],
    stock: [null, [Validators.required]],
    personalLoans: [null, [Validators.required]],
    bills: [null, [Validators.required]],
    balanceAmount: [0, [Validators.required]],
    bankAccountId: [],
    periodId: []
  });

  constructor(
    private balanceService: BalanceService,
    private bankAccountService: BankAccountService,
    private periodService: PeriodService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private addBalanceService: AddBalanceService,
    private accountService: AccountService,
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit() {
    this.applyJsScript();
    this.bankAccountService.findAll().subscribe((res: HttpResponse<IBankAccount[]>) => (this.bankaccounts = res.body || []));
    this.periodService.query().subscribe((res: HttpResponse<IPeriod[]>) => (this.periods = res.body || []));
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }
  applyJsScript() {
    new f();
  }
  scrollToElementWhenCalculation($element): void {
    setTimeout(() => {
      $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }, 500);
    this.showStepper = true;
    this.startCalculation = true;
    this.formDone = true;
    this.editForm.controls['balanceAmount'].setValue(0);
  }
  scrollToElementWhenSkipToDeposit($element): void {
    setTimeout(() => {
      $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }, 500);
    this.showStepper = true;
    this.formDone = false;
    this.startCalculation = false;
    this.editForm.controls['cashHand'].setValue(0);
    this.editForm.controls['cashBankAccount'].setValue(0);
    this.editForm.controls['loan'].setValue(0);
    this.editForm.controls['moneyFromSale'].setValue(0);
    this.editForm.controls['gold'].setValue(0);
    this.editForm.controls['silver'].setValue(0);
    this.editForm.controls['receivables'].setValue(0);
    this.editForm.controls['assetsCash'].setValue(0);
    this.editForm.controls['stock'].setValue(0);
    this.editForm.controls['personalLoans'].setValue(0);
    this.editForm.controls['bills'].setValue(0);
  }

  /*  *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   **/
  save(): void {
    this.dashboardService.loadCurrentBankAccount().subscribe(bankAccount => {
      this.isSaving = true;
      const balance = this.createFromForm(bankAccount.body);
      this.subscribeToSaveResponse(this.balanceService.create(balance));
    });
  }

  private createFromForm(bankAccount: IBankAccount): IBalance {
    return {
      ...new Balance(),
      balanceAmount: this.calculateBalanceAmount(),
      balanceDate: this.editForm.get(['balanceDate'])!.value,
      bankAccountId: bankAccount.id
    };
  }
  calculateBalanceAmount(): number {
    if (this.startCalculation) {
      const cashHand: number = this.editForm.get(['cashHand'])!.value;
      const cashBankAccount: number = this.editForm.get(['cashBankAccount'])!.value;
      const loan: number = this.editForm.get(['loan'])!.value;
      const moneyFromSale: number = this.editForm.get(['moneyFromSale'])!.value;
      const gold: number = this.editForm.get(['gold'])!.value;
      const silver: number = this.editForm.get(['silver'])!.value;
      const assetsCash: number = this.editForm.get(['assetsCash'])!.value;
      const receivables: number = this.editForm.get(['receivables'])!.value;
      const stock: number = this.editForm.get(['stock'])!.value;
      const personalLoans: number = this.editForm.get(['personalLoans'])!.value;
      const bills: number = this.editForm.get(['bills'])!.value;
      return cashHand + cashBankAccount + loan + moneyFromSale + gold + silver + assetsCash + receivables + stock - personalLoans - bills;
    } else return this.editForm.get(['balanceAmount'])!.value;
  }
  getBalanceDate(): string {
    const balanceDate: Moment = this.editForm.get(['balanceDate'])!.value;
    if (balanceDate) {
      return balanceDate.format('dddd Do MMMM, YYYY');
    } else return '';
  }
  subscribeToSaveResponse(result: Observable<HttpResponse<IBalance>>): void {
    result.subscribe(
      res => {
        const balance: IBalance = res.body;
        if (balance.balanceAmount) {
          this.addBalanceService.addBalanceAfterGettingUserIdByAccountLogin(this.accountService.getAuthenticationState(), balance);
        }
        this.onSaveSuccess();
      },
      () => this.onSaveError()
    );
  }

  onSaveSuccess(): void {
    this.isSaving = false;
    this.router.navigate(['balance']);
  }

  onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
  doneFalse() {
    this.formDone = false;
  }
  doneTrue() {
    this.formDone = true;
    this.resizeComponents();
  }
  resizeComponents() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
