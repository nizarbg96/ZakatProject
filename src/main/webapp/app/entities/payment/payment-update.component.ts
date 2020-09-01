import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPayment, Payment } from 'app/shared/model/payment.model';
import { PaymentService } from './payment.service';
import { IZakat } from 'app/shared/model/zakat.model';
import { ZakatService } from 'app/entities/zakat/zakat.service';
import { IBeneficiary } from 'app/shared/model/beneficiary.model';
import { BeneficiaryService } from 'app/entities/beneficiary/beneficiary.service';

type SelectableEntity = IZakat | IBeneficiary;

@Component({
  selector: 'jhi-payment-update',
  templateUrl: './payment-update.component.html',
  styleUrls: ['./../entities.scss']
})
export class PaymentUpdateComponent implements OnInit {
  isSaving = false;
  zakats: IZakat[] = [];
  beneficiaries: IBeneficiary[] = [];
  paymentDateDp: any;

  editForm = this.fb.group({
    id: [],
    paymentAmount: [null, [Validators.required]],
    paymentDate: [null, [Validators.required]],
    zakatId: [],
    beneficiaryId: []
  });

  constructor(
    protected paymentService: PaymentService,
    protected zakatService: ZakatService,
    protected beneficiaryService: BeneficiaryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ payment }) => {
      this.updateForm(payment);

      this.zakatService.query().subscribe((res: HttpResponse<IZakat[]>) => (this.zakats = res.body || []));

      this.beneficiaryService.query().subscribe((res: HttpResponse<IBeneficiary[]>) => (this.beneficiaries = res.body || []));
    });
  }

  updateForm(payment: IPayment): void {
    this.editForm.patchValue({
      id: payment.id,
      paymentAmount: payment.paymentAmount,
      paymentDate: payment.paymentDate,
      zakatId: payment.zakatId,
      beneficiaryId: payment.beneficiaryId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const payment = this.createFromForm();
    if (payment.id !== undefined) {
      this.subscribeToSaveResponse(this.paymentService.update(payment));
    } else {
      this.subscribeToSaveResponse(this.paymentService.create(payment));
    }
  }

  private createFromForm(): IPayment {
    return {
      ...new Payment(),
      id: this.editForm.get(['id'])!.value,
      paymentAmount: this.editForm.get(['paymentAmount'])!.value,
      paymentDate: this.editForm.get(['paymentDate'])!.value,
      zakatId: this.editForm.get(['zakatId'])!.value,
      beneficiaryId: this.editForm.get(['beneficiaryId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPayment>>): void {
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
