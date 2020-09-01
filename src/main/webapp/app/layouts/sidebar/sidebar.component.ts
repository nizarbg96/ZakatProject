import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';
import { Account } from 'app/core/user/account.model';
import { Subscription } from 'rxjs';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/core/login/login.service';
import { Router } from '@angular/router';
// import { MenusService } from './menus.service';

@Component({
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [state('up', style({ height: 0 })), state('down', style({ height: '*' })), transition('up <=> down', animate(200))])
  ]
})
export class SidebarComponent implements OnInit {
  menus = [];
  account: Account | null = null;
  authSubscription?: Subscription;
  imgUrl = '../../../content/img/user.jpg';

  constructor(
    public sidebarservice: SidebarService,
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.menus = sidebarservice.getMenuList();
  }

  ngOnInit() {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      this.account.authorities = this.account.authorities.slice().reverse();
    });
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu: any) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu: any) {
    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }
  resizeComponents() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }

  logout() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      this.loginService.logout();
      this.router.navigate(['']);
    }, 300);
  }
}
