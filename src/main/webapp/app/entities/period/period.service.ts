import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPeriod } from 'app/shared/model/period.model';
import { IBalance } from 'app/shared/model/balance.model';
import { BalanceService } from 'app/entities/balance/balance.service';

type EntityResponseType = HttpResponse<IPeriod>;
type EntityArrayResponseType = HttpResponse<IPeriod[]>;

@Injectable({ providedIn: 'root' })
export class PeriodService {
  public resourceUrl = SERVER_API_URL + 'api/periods';

  constructor(protected http: HttpClient, private balanceService: BalanceService) {}

  create(period: IPeriod): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(period);
    return this.http
      .post<IPeriod>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(period: IPeriod): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(period);
    return this.http
      .put<IPeriod>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
  updatePeriodsByBalanceInput(balance: IBalance, type: string, login: String): Observable<EntityResponseType> {
    const copy = this.balanceService.convertDateFromClient(balance);
    return this.http
      .put<IPeriod>(`${this.resourceUrl}/balanceInput/${login}`, copy, { observe: 'response', params: new HttpParams().set('type', type) })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPeriod>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
  findLatest(login: String): Observable<EntityResponseType> {
    return this.http
      .get<IPeriod>(`${this.resourceUrl}/latestPeriod/${login}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
  findAllTaxablePeriods(login: String, taxable: string): Observable<EntityArrayResponseType> {
    return this.http
      .get<IPeriod[]>(`${this.resourceUrl}/taxable/${login}`, { observe: 'response', params: new HttpParams().set('taxable', taxable) })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }
  findAllByloginUser(login: String): Observable<EntityArrayResponseType> {
    return this.http
      .get<IPeriod[]>(`${this.resourceUrl}/loginUser/${login}`, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }
  findAllByloginUser1(login: String, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPeriod[]>(`${this.resourceUrl}/loginUser-pagination/${login}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPeriod[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  deleteAllByLogin(login: String): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/allByLogin/${login}`, { observe: 'response' });
  }

  protected convertDateFromClient(period: IPeriod): IPeriod {
    const copy: IPeriod = Object.assign({}, period, {
      beginDate: period.beginDate && period.beginDate.isValid() ? period.beginDate.format(DATE_FORMAT) : undefined,
      endDate: period.endDate && period.endDate.isValid() ? period.endDate.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.beginDate = res.body.beginDate ? moment(res.body.beginDate) : undefined;
      res.body.endDate = res.body.endDate ? moment(res.body.endDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((period: IPeriod) => {
        period.beginDate = period.beginDate ? moment(period.beginDate) : undefined;
        period.endDate = period.endDate ? moment(period.endDate) : undefined;
      });
    }
    return res;
  }
}
