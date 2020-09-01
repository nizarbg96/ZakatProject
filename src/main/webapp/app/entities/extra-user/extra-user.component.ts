import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IExtraUser } from 'app/shared/model/extra-user.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ExtraUserService } from './extra-user.service';
import { ExtraUserDeleteDialogComponent } from './extra-user-delete-dialog.component';

@Component({
  selector: 'jhi-extra-user',
  templateUrl: './extra-user.component.html',
  styleUrls: ['./../entities.scss']
})
export class ExtraUserComponent implements OnInit, OnDestroy {
  extraUsers?: IExtraUser[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected extraUserService: ExtraUserService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.extraUserService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IExtraUser[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.registerChangeInExtraUsers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IExtraUser): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInExtraUsers(): void {
    this.eventSubscriber = this.eventManager.subscribe('extraUserListModification', () => this.loadPage());
  }

  delete(extraUser: IExtraUser): void {
    const modalRef = this.modalService.open(ExtraUserDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.extraUser = extraUser;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IExtraUser[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/extra-user'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.extraUsers = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
