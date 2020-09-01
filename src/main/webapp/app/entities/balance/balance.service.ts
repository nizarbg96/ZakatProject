import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBalance } from 'app/shared/model/balance.model';
import { IPeriod } from 'app/shared/model/period.model';

type EntityResponseType = HttpResponse<IBalance>;
type EntityArrayResponseType = HttpResponse<IBalance[]>;
type EntityArrayResponseTypePeriod = HttpResponse<IPeriod[]>;

@Injectable({ providedIn: 'root' })
export class BalanceService {
  public resourceUrl = SERVER_API_URL + 'api/balances';

  constructor(protected http: HttpClient) {}

  create(balance: IBalance): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(balance);
    return this.http
      .post<IBalance>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(balance: IBalance): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(balance);
    return this.http
      .put<IBalance>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
  updateAll(balances: IBalance[]): Observable<EntityArrayResponseType> {
    const copys = this.convertDateArrayFromClient(balances);
    return this.http
      .put<IBalance[]>(this.resourceUrl + '/userLogin', copys, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }
  assignPeriodsToBalances(balances: IBalance[], login: string, userId: number): Observable<EntityArrayResponseTypePeriod> {
    const copy = this.convertDateArrayFromClient(balances);
    return this.http
      .post<IBalance[]>(`${this.resourceUrl}/userLogin/${login}/${userId}`, copy, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseTypePeriod) => this.convertDateArrayFromServerPeriod(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBalance>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
  findAll(): Observable<EntityArrayResponseType> {
    return this.http
      .get<IBalance[]>(this.resourceUrl, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }
  findAllByPeriodId(id: number): Observable<EntityArrayResponseType> {
    return this.http
      .get<IBalance[]>(`${this.resourceUrl}/period/${id}`, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }
  findAllByLogin(login: String): Observable<EntityArrayResponseType> {
    return this.http
      .get<IBalance[]>(`${this.resourceUrl}/loginUser-noPaging/${login}`, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBalance[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryByLogin(login: String, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBalance[]>(`${this.resourceUrl}/loginUser-withPaging/${login}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }
  findAllByPeriodId1(id: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBalance[]>(`${this.resourceUrl}/period-withPaging/${id}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAllByBannkAccountId(id: number): Observable<EntityArrayResponseType> {
    return this.http
      .get<IBalance[]>(`${this.resourceUrl}/bankAccount/${id}`, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  convertDateFromClient(balance: IBalance): IBalance {
    const copy: IBalance = Object.assign({}, balance, {
      balanceDate: balance.balanceDate && balance.balanceDate.isValid() ? balance.balanceDate.format(DATE_FORMAT) : undefined
    });
    return copy;
  }
  convertDateArrayFromClient(balances: IBalance[]): IBalance[] {
    const copys: IBalance[] = [];
    balances.slice().forEach(balance => {
      const copy: IBalance = Object.assign({}, balance, {
        balanceDate: balance.balanceDate && balance.balanceDate.isValid() ? balance.balanceDate.format(DATE_FORMAT) : undefined
      });
      copys.push(copy);
    });
    return copys;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.balanceDate = res.body.balanceDate ? moment(res.body.balanceDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((balance: IBalance) => {
        balance.balanceDate = balance.balanceDate ? moment(balance.balanceDate) : undefined;
      });
    }
    return res;
  }
  protected convertDateArrayFromServerPeriod(res: EntityArrayResponseTypePeriod): EntityArrayResponseTypePeriod {
    if (res.body) {
      res.body.forEach((period: IPeriod) => {
        period.beginDate = period.beginDate ? moment(period.beginDate) : undefined;
        period.endDate = period.endDate ? moment(period.endDate) : undefined;
      });
    }
    return res;
  }
}
