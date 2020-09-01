import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IZakat, Zakat } from 'app/shared/model/zakat.model';
import { ZakatService } from './zakat.service';
import { IExtraUser } from 'app/shared/model/extra-user.model';
import { ExtraUserService } from 'app/entities/extra-user/extra-user.service';

@Component({
  selector: 'jhi-zakat-update',
  templateUrl: './zakat-update.component.html',
  styleUrls: ['./../entities.scss']
})
export class ZakatUpdateComponent implements OnInit {
  isSaving = false;
  extrausers: IExtraUser[] = [];

  editForm = this.fb.group({
    id: [],
    dueAmount: [null, [Validators.required]],
    remainingAmount: [null, [Validators.required]],
    extraUserId: []
  });

  constructor(
    protected zakatService: ZakatService,
    protected extraUserService: ExtraUserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ zakat }) => {
      this.updateForm(zakat);

      this.extraUserService.query().subscribe((res: HttpResponse<IExtraUser[]>) => (this.extrausers = res.body || []));
    });
  }

  updateForm(zakat: IZakat): void {
    this.editForm.patchValue({
      id: zakat.id,
      dueAmount: zakat.dueAmount,
      remainingAmount: zakat.remainingAmount,
      extraUserId: zakat.extraUserId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const zakat = this.createFromForm();
    if (zakat.id !== undefined) {
      this.subscribeToSaveResponse(this.zakatService.update(zakat));
    } else {
      this.subscribeToSaveResponse(this.zakatService.create(zakat));
    }
  }

  private createFromForm(): IZakat {
    return {
      ...new Zakat(),
      id: this.editForm.get(['id'])!.value,
      dueAmount: this.editForm.get(['dueAmount'])!.value,
      remainingAmount: this.editForm.get(['remainingAmount'])!.value,
      extraUserId: this.editForm.get(['extraUserId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IZakat>>): void {
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

  trackById(index: number, item: IExtraUser): any {
    return item.id;
  }
}
