import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BeneficiaryService } from 'app/entities/beneficiary/beneficiary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Beneficiary, IBeneficiary } from 'app/shared/model/beneficiary.model';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { PayZakatService } from 'app/components/pay-zakat/pay-zakat.service';
import { ExtraUserService } from 'app/entities/extra-user/extra-user.service';
import { AccountService } from 'app/core/auth/account.service';
import { ExtraUser } from 'app/shared/model/extra-user.model';

@Component({
  selector: 'jhi-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrls: ['./add-beneficiary.component.scss']
})
export class AddBeneficiaryComponent implements OnInit {
  isSaving = false;
  extraUser: ExtraUser;
  editForm = this.fb.group({
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    phoneNumber: [null, [Validators.minLength(8), Validators.maxLength(8)]],
    adress: [],
    otherDetails: []
  });

  constructor(
    private fb: FormBuilder,
    protected beneficiaryService: BeneficiaryService,
    private router: Router,
    public payZakatService: PayZakatService,
    private extraUserService: ExtraUserService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.accountService.getAuthenticationState().subscribe(account => {
      this.extraUserService.findByLogin(account.login).subscribe(resp => {
        this.extraUser = resp.body;
      });
    });
  }
  save(): void {
    this.isSaving = true;
    const beneficiary = this.createFromForm();
    this.subscribeToSaveResponse(this.beneficiaryService.create(beneficiary));
  }

  private createFromForm(): IBeneficiary {
    return {
      ...new Beneficiary(),
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      adress: this.editForm.get(['adress'])!.value,
      otherDetails: this.editForm.get(['otherDetails'])!.value,
      extraUserId: this.extraUser.id
    };
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBeneficiary>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    if (this.router.url == '/pay-zakat') {
      this.payZakatService.closeDialog.next();
    } else {
      this.router.navigate(['/', 'beneficiaries']);
    }
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
