import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IExtraUser, ExtraUser } from 'app/shared/model/extra-user.model';
import { ExtraUserService } from './extra-user.service';
import { IBankAccount } from 'app/shared/model/bank-account.model';
import { BankAccountService } from 'app/entities/bank-account/bank-account.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

type SelectableEntity = IBankAccount | IUser;

@Component({
  selector: 'jhi-extra-user-update',
  templateUrl: './extra-user-update.component.html',
  styleUrls: ['./../entities.scss']
})
export class ExtraUserUpdateComponent implements OnInit {
  isSaving = false;
  bankaccounts: IBankAccount[] = [];
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    bankAccountId: [],
    userId: []
  });

  constructor(
    protected extraUserService: ExtraUserService,
    protected bankAccountService: BankAccountService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ extraUser }) => {
      this.updateForm(extraUser);

      this.bankAccountService
        .query({ filter: 'extrauser-is-null' })
        .pipe(
          map((res: HttpResponse<IBankAccount[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IBankAccount[]) => {
          if (!extraUser.bankAccountId) {
            this.bankaccounts = resBody;
          } else {
            this.bankAccountService
              .find(extraUser.bankAccountId)
              .pipe(
                map((subRes: HttpResponse<IBankAccount>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IBankAccount[]) => (this.bankaccounts = concatRes));
          }
        });

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(extraUser: IExtraUser): void {
    this.editForm.patchValue({
      id: extraUser.id,
      bankAccountId: extraUser.bankAccountId,
      userId: extraUser.userId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const extraUser = this.createFromForm();
    if (extraUser.id !== undefined) {
      this.subscribeToSaveResponse(this.extraUserService.update(extraUser));
    } else {
      this.subscribeToSaveResponse(this.extraUserService.create(extraUser));
    }
  }

  private createFromForm(): IExtraUser {
    return {
      ...new ExtraUser(),
      id: this.editForm.get(['id'])!.value,
      bankAccountId: this.editForm.get(['bankAccountId'])!.value,
      userId: this.editForm.get(['userId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExtraUser>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
