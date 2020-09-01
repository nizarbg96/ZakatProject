import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { SidebarService } from 'app/layouts/sidebar/sidebar.service';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;
  img1 = '../../content/images/home1.jpg';
  img2 = '../../content/images/home22.jpg';
  img3 = '../../content/images/home3.jpg';
  img4 = '../../content/images/zakat-png-7.png';
  dashboardImg = '../../content/images/dashboard.JPG';
  test: Date = new Date();

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    public sidebarservice: SidebarService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
