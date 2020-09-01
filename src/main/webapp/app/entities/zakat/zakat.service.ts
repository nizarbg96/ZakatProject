import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IZakat } from 'app/shared/model/zakat.model';

type EntityResponseType = HttpResponse<IZakat>;
type EntityArrayResponseType = HttpResponse<IZakat[]>;

@Injectable({ providedIn: 'root' })
export class ZakatService {
  public resourceUrl = SERVER_API_URL + 'api/zakats';

  constructor(protected http: HttpClient) {}

  create(zakat: IZakat): Observable<EntityResponseType> {
    return this.http.post<IZakat>(this.resourceUrl, zakat, { observe: 'response' });
  }

  update(zakat: IZakat): Observable<EntityResponseType> {
    return this.http.put<IZakat>(this.resourceUrl, zakat, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IZakat>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IZakat[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
  queryByLogin(login: string, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IZakat[]>(`${this.resourceUrl}/queryBylogin/${login}`, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  getZakatByLogin(login: String): Observable<any> {
    return this.http.get<IZakat[]>(`${this.resourceUrl}/loginUser/${login}`);
  }
}
