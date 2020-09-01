import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IZakat, Zakat } from 'app/shared/model/zakat.model';
import { ZakatService } from './zakat.service';
import { ZakatComponent } from './zakat.component';
import { ZakatDetailComponent } from './zakat-detail.component';
import { ZakatUpdateComponent } from './zakat-update.component';

@Injectable({ providedIn: 'root' })
export class ZakatResolve implements Resolve<IZakat> {
  constructor(private service: ZakatService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IZakat> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((zakat: HttpResponse<Zakat>) => {
          if (zakat.body) {
            return of(zakat.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Zakat());
  }
}

export const zakatRoute: Routes = [
  {
    path: '',
    component: ZakatComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'zakatReminderApp.zakat.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ZakatDetailComponent,
    resolve: {
      zakat: ZakatResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'zakatReminderApp.zakat.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ZakatUpdateComponent,
    resolve: {
      zakat: ZakatResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'zakatReminderApp.zakat.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ZakatUpdateComponent,
    resolve: {
      zakat: ZakatResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'zakatReminderApp.zakat.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
