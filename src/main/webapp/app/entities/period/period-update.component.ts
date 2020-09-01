import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPeriod, Period } from 'app/shared/model/period.model';
import { PeriodService } from './period.service';
import { IZakat } from 'app/shared/model/zakat.model';
import { ZakatService } from 'app/entities/zakat/zakat.service';
import { IExtraUser } from 'app/shared/model/extra-user.model';
import { ExtraUserService } from 'app/entities/extra-user/extra-user.service';

type SelectableEntity = IZakat | IExtraUser;

@Component({
  selector: 'jhi-period-update',
  templateUrl: './period-update.component.html',
  styleUrls: ['./../entities.scss']
})
export class PeriodUpdateComponent implements OnInit {
  isSaving = false;
  zakats: IZakat[] = [];
  extrausers: IExtraUser[] = [];
  beginDateDp: any;
  endDateDp: any;

  editForm = this.fb.group({
    id: [],
    beginDate: [null, [Validators.required]],
    endDate: [],
    duration: [],
    taxable: [null, [Validators.required]],
    zakatId: [],
    extraUserId: []
  });

  constructor(
    protected periodService: PeriodService,
    protected zakatService: ZakatService,
    protected extraUserService: ExtraUserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ period }) => {
      this.updateForm(period);

      this.zakatService
        .query({ filter: 'period-is-null' })
        .pipe(
          map((res: HttpResponse<IZakat[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IZakat[]) => {
          if (!period.zakatId) {
            this.zakats = resBody;
          } else {
            this.zakatService
              .find(period.zakatId)
              .pipe(
                map((subRes: HttpResponse<IZakat>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IZakat[]) => (this.zakats = concatRes));
          }
        });

      this.extraUserService.query().subscribe((res: HttpResponse<IExtraUser[]>) => (this.extrausers = res.body || []));
    });
  }

  updateForm(period: IPeriod): void {
    this.editForm.patchValue({
      id: period.id,
      beginDate: period.beginDate,
      endDate: period.endDate,
      duration: period.duration,
      taxable: period.taxable,
      zakatId: period.zakatId,
      extraUserId: period.extraUserId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const period = this.createFromForm();
    if (period.id !== undefined) {
      this.subscribeToSaveResponse(this.periodService.update(period));
    } else {
      this.subscribeToSaveResponse(this.periodService.create(period));
    }
  }

  private createFromForm(): IPeriod {
    return {
      ...new Period(),
      id: this.editForm.get(['id'])!.value,
      beginDate: this.editForm.get(['beginDate'])!.value,
      endDate: this.editForm.get(['endDate'])!.value,
      duration: this.editForm.get(['duration'])!.value,
      taxable: this.editForm.get(['taxable'])!.value,
      zakatId: this.editForm.get(['zakatId'])!.value,
      extraUserId: this.editForm.get(['extraUserId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPeriod>>): void {
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
