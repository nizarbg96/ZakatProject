import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBankAccount } from 'app/shared/model/bank-account.model';
import { IBalance } from 'app/shared/model/balance.model';
import { map } from 'rxjs/operators';

type EntityResponseType = HttpResponse<IBankAccount>;
type EntityArrayResponseType = HttpResponse<IBankAccount[]>;

@Injectable({ providedIn: 'root' })
export class BankAccountService {
  public resourceUrl = SERVER_API_URL + 'api/bank-accounts';

  constructor(protected http: HttpClient) {}

  create(bankAccount: IBankAccount): Observable<EntityResponseType> {
    return this.http.post<IBankAccount>(this.resourceUrl, bankAccount, { observe: 'response' });
  }

  update(bankAccount: IBankAccount): Observable<EntityResponseType> {
    return this.http.put<IBankAccount>(this.resourceUrl, bankAccount, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBankAccount>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<IBankAccount[]>(SERVER_API_URL + 'api/bank-accounts-no-pagination', { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBankAccount[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
  queryByLogin(login: String, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBankAccount[]>(`${this.resourceUrl}/loginUser/${login}`, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findByUserId(id: number): Observable<EntityResponseType> {
    return this.http.get<IBankAccount>(`${this.resourceUrl}/`, { observe: 'response', params: new HttpParams().set('id', id + '') });
  }
}
