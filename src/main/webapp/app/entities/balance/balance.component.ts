import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBalance } from 'app/shared/model/balance.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { BalanceService } from './balance.service';
import { BalanceDeleteDialogComponent } from './balance-delete-dialog.component';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { IPeriod } from 'app/shared/model/period.model';
import { PeriodService } from 'app/entities/period/period.service';

@Component({
  selector: 'jhi-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./../entities.scss']
})
export class BalanceComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  balances?: IBalance[] = [];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  periods?: IPeriod[] = [];

  constructor(
    protected balanceService: BalanceService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    private accountService: AccountService,
    private periodService: PeriodService
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;
    if (this.account) {
      if (this.account.authorities[1] === 'ROLE_ADMIN') {
        this.loadDataWhenAdmin(pageToLoad);
      } else {
        this.loadDataWhenUser(pageToLoad);
      }
    }
  }

  ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.registerChangeInBalances();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBalance): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBalances(): void {
    this.eventSubscriber = this.eventManager.subscribe('balanceListModification', () => this.loadPage());
  }

  delete(balance: IBalance): void {
    const modalRef = this.modalService.open(BalanceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.balance = balance;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IBalance[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/balance'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.balances = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  protected loadDataWhenUser(pageToLoad: number) {
    this.balanceService
      .queryByLogin(this.account.login, {
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IBalance[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
    this.periodService.findAllByloginUser(this.account.login).subscribe(res => {
      this.periods = res.body;
    });
  }

  protected loadDataWhenAdmin(pageToLoad: number) {
    this.balanceService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IBalance[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  findPeriod(periodId: number) {
    return this.periods.slice().filter(period => period.id === periodId)[0];
  }
}
