import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankAccount, IBankAccount } from 'app/shared/model/bank-account.model';
import { BankAccountService } from 'app/entities/bank-account/bank-account.service';
import { forkJoin, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ExtraUser, IExtraUser } from 'app/shared/model/extra-user.model';
import { Account } from 'app/core/user/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { DashboardService } from 'app/dashboard/dashboard.service';
import { UserService } from 'app/core/user/user.service';
import { ExtraUserService } from 'app/entities/extra-user/extra-user.service';
import { Router } from '@angular/router';
import { AddBankAccountService, AuthResponseData, BankAccountBalance } from 'app/services/bank-account.service';
import { MatRadioButton } from '@angular/material/radio';
import { Balance, IBalance } from 'app/shared/model/balance.model';
import * as moment from 'moment';
import { BalanceService } from 'app/entities/balance/balance.service';

@Component({
  selector: 'jhi-add-bank-account-stepper',
  templateUrl: './add-bank-account-stepper.component.html',
  styleUrls: ['./add-bank-account-stepper.component.scss']
})
export class AddBankAccountStepperComponent implements OnInit {
  isSaving = false;
  account: Account | null = null;
  userId = 0;
  bank1 = '../../../content/images/bank1.png';
  bank2 = '../../../content/images/bank2.png';
  bank3 = '../../../content/images/bank3.png';
  @ViewChild('radio1', { static: true }) radio1: MatRadioButton;
  @ViewChild('radio2', { static: true }) radio2: MatRadioButton;
  @ViewChild('radio3', { static: true }) radio3: MatRadioButton;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  selectedRadio = null;
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private _formBuilder: FormBuilder,
    private bankAccountService: BankAccountService,
    private accountService: AccountService,
    private dashboardService: DashboardService,
    private userService: UserService,
    private extraUserService: ExtraUserService,
    private router: Router,
    private addBankAccountService: AddBankAccountService,
    private balanceService: BalanceService
  ) {}

  onSubmit() {
    if (!this.firstFormGroup.valid || !this.secondFormGroup.valid) {
      return;
    }
    const email = this.firstFormGroup.value.email;
    const password = this.secondFormGroup.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.addBankAccountService.login(email, password);
    } else {
      authObs = this.addBankAccountService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        this.save();
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
  }

  ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(account => (this.account = account));

    this.firstFormGroup = this._formBuilder.group({
      email: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      password: ['', Validators.required]
    });
  }

  save(): void {
    this.isSaving = true;
    const bankAccount = this.createFromForm();
    this.subscribeToSaveResponse(this.bankAccountService.create(bankAccount));
  }

  private createFromForm(): IBankAccount {
    return {
      ...new BankAccount(),
      bankName: this.bankName(),
      bankAdress: this.bankAdress(),
      rib: 0
    };
  }
  private createBalance(bankAccount: IBankAccount, balance: BankAccountBalance): IBalance {
    return {
      ...new Balance(),
      balanceAmount: balance.balanceAmount,
      balanceDate: moment(balance.balanceDate, 'YYYY-MM-DD'),
      bankAccountId: bankAccount.id
    };
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>): void {
    result.subscribe(
      bankAccount => {
        this.updateUser(bankAccount.body);
      },
      () => this.onSaveError()
    );
  }
  protected findUser(): Observable<HttpResponse<IExtraUser>> {
    this.isSaving = false;
    return this.extraUserService.findByLogin(this.account.login);
  }
  updateUser(respBankAccount: IBankAccount) {
    this.findUser().subscribe(user => {
      const userResp: ExtraUser = user.body;
      const bankAccountId: number = respBankAccount.id;
      const extraUser = new ExtraUser(userResp.id, bankAccountId, userResp.userId);
      this.subscribeToSaveResponse2(this.extraUserService.update(extraUser), respBankAccount);
    });
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
  protected subscribeToSaveResponse2(result: Observable<HttpResponse<IExtraUser>>, respBankAccount: IBankAccount): void {
    result.subscribe(
      () => {
        this.addBankAccountService.fetchBalances().subscribe(balances => {
          const balancesObs = balances.map(balance => this.balanceService.create(this.createBalance(respBankAccount, balance)));
          const source = forkJoin(balancesObs);
          source.subscribe(res => {
            this.accountService.getAuthenticationState().subscribe(account => {
              this.extraUserService.findByLogin(account.login).subscribe(user => {
                const extraUser: IExtraUser = user.body;
                this.balanceService
                  .assignPeriodsToBalances(
                    res.map(balance => balance.body),
                    account.login,
                    extraUser.id
                  )
                  .subscribe(resultPeriodTable => {
                    this.onSaveSuccess2();
                  });
              });
            });
          });
        });
      },
      () => this.onSaveError2()
    );
  }
  protected onSaveSuccess2(): void {
    this.isSaving = false;
    this.isLoading = false;
    this.dashboardService.closeDialog.next();
  }
  protected onSaveError2(): void {
    this.isSaving = false;
  }

  clicked(radio: MatRadioButton) {
    this.selectedRadio = radio.value;
    if (radio.value === '1') {
      this.radio2.checked = false;
      this.radio3.checked = false;
    } else if (radio.value === '2') {
      this.radio1.checked = false;
      this.radio3.checked = false;
    } else if (radio.value === '3') {
      this.radio1.checked = false;
      this.radio2.checked = false;
    }
  }
  bankName() {
    if (this.selectedRadio === '1') {
      return 'bank 1';
    } else if (this.selectedRadio === '2') {
      return 'bank 2';
    } else if (this.selectedRadio === '3') {
      return 'bank 3';
    } else {
      return null;
    }
  }
  bankAdress() {
    if (this.selectedRadio === '1') {
      return 'adress 1';
    } else if (this.selectedRadio === '2') {
      return 'adress 2';
    } else if (this.selectedRadio === '3') {
      return 'adress 3';
    } else {
      return null;
    }
  }
}
