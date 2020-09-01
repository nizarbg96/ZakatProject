import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBeneficiary, Beneficiary } from 'app/shared/model/beneficiary.model';
import { BeneficiaryService } from './beneficiary.service';
import { BeneficiaryComponent } from './beneficiary.component';
import { BeneficiaryDetailComponent } from './beneficiary-detail.component';
import { BeneficiaryUpdateComponent } from './beneficiary-update.component';

@Injectable({ providedIn: 'root' })
export class BeneficiaryResolve implements Resolve<IBeneficiary> {
  constructor(private service: BeneficiaryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBeneficiary> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((beneficiary: HttpResponse<Beneficiary>) => {
          if (beneficiary.body) {
            return of(beneficiary.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Beneficiary());
  }
}

export const beneficiaryRoute: Routes = [
  {
    path: '',
    component: BeneficiaryComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'zakatReminderApp.beneficiary.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BeneficiaryDetailComponent,
    resolve: {
      beneficiary: BeneficiaryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'zakatReminderApp.beneficiary.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BeneficiaryUpdateComponent,
    resolve: {
      beneficiary: BeneficiaryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'zakatReminderApp.beneficiary.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BeneficiaryUpdateComponent,
    resolve: {
      beneficiary: BeneficiaryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'zakatReminderApp.beneficiary.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
