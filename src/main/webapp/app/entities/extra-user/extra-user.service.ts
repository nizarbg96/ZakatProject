import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IExtraUser } from 'app/shared/model/extra-user.model';

type EntityResponseType = HttpResponse<IExtraUser>;
type EntityArrayResponseType = HttpResponse<IExtraUser[]>;

@Injectable({ providedIn: 'root' })
export class ExtraUserService {
  public resourceUrl = SERVER_API_URL + 'api/extra-users';

  constructor(protected http: HttpClient) {}

  create(extraUser: IExtraUser): Observable<EntityResponseType> {
    return this.http.post<IExtraUser>(this.resourceUrl, extraUser, { observe: 'response' });
  }

  update(extraUser: IExtraUser): Observable<EntityResponseType> {
    return this.http.put<IExtraUser>(this.resourceUrl, extraUser, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IExtraUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findByLogin(login: string): Observable<EntityResponseType> {
    return this.http.get<IExtraUser>(`${this.resourceUrl}/userLogin/${login}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IExtraUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
