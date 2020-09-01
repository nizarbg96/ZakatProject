import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBeneficiary } from 'app/shared/model/beneficiary.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { BeneficiaryService } from './beneficiary.service';
import { BeneficiaryDeleteDialogComponent } from './beneficiary-delete-dialog.component';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

@Component({
  selector: 'jhi-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./../entities.scss']
})
export class BeneficiaryComponent implements OnInit, OnDestroy {
  beneficiaries?: IBeneficiary[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  account: Account | null = null;

  constructor(
    protected beneficiaryService: BeneficiaryService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    private accountService: AccountService
  ) {}

  loadPage(account?: Account, page?: number): void {
    const pageToLoad: number = page || this.page;
    if (account.authorities[0] === 'ROLE_ADMIN') {
      this.beneficiaryService
        .query({
          page: pageToLoad - 1,
          size: this.itemsPerPage,
          sort: this.sort()
        })
        .subscribe(
          (res: HttpResponse<IBeneficiary[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
          () => this.onError()
        );
    } else {
      this.beneficiaryService.getAllByLogin(account.login).subscribe(
        (res: HttpResponse<IBeneficiary[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
    }
  }

  ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      this.activatedRoute.data.subscribe(data => {
        this.page = data.pagingParams.page;
        this.ascending = data.pagingParams.ascending;
        this.predicate = data.pagingParams.predicate;
        this.ngbPaginationPage = data.pagingParams.page;
        this.loadPage(account);
      });
      this.registerChangeInBeneficiaries();
    });
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBeneficiary): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBeneficiaries(): void {
    this.eventSubscriber = this.eventManager.subscribe('beneficiaryListModification', () => this.loadPage());
  }

  delete(beneficiary: IBeneficiary): void {
    const modalRef = this.modalService.open(BeneficiaryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.beneficiary = beneficiary;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IBeneficiary[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/beneficiary'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.beneficiaries = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
