import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = true;
  _hasBackgroundImage = true;
  menus = [
    {
      title: 'administration',
      type: 'header',
      role: ['ROLE_ADMIN']
    },
    {
      title: 'Administration',
      icon: 'fas fa-home',
      active: false,
      type: 'dropdown',
      role: ['ROLE_ADMIN'],
      submenus: [
        {
          title: 'User management ',
          path: '/admin/user-management',
          role: ['ROLE_ADMIN']
        },
        {
          title: 'Metrics',
          path: '/admin/metrics',
          role: ['ROLE_ADMIN']
        },
        {
          title: 'Health',
          path: '/admin/health',
          role: ['ROLE_ADMIN']
        },
        {
          title: 'Configuration ',
          path: '/admin/configuration',
          role: ['ROLE_ADMIN']
        },
        {
          title: 'Audits',
          path: '/admin/audits',
          role: ['ROLE_ADMIN']
        },
        {
          title: 'Logs ',
          path: '/admin/logs',
          role: ['ROLE_ADMIN']
        },
        {
          title: 'Api',
          path: '/admin/docs',
          role: ['ROLE_ADMIN']
        },
        {
          title: 'Database',
          path: '/admin/h2-console/',
          role: ['ROLE_ADMIN']
        }
      ]
    },
    {
      title: 'Entities',
      icon: 'fas fa-home',
      active: false,
      type: 'dropdown',
      role: ['ROLE_ADMIN'],
      submenus: [
        {
          title: 'Balances',
          path: '/balance',
          role: ['ROLE_ADMIN']
        },
        {
          title: 'Periods',
          path: '/period',
          role: ['ROLE_ADMIN']
        },
        {
          title: 'Zakats',
          path: '/zakat',
          role: ['ROLE_ADMIN']
        },
        {
          title: 'BankAccount ',
          path: '/bank-account',
          role: ['ROLE_ADMIN']
        },
        {
          title: 'Beneficiaries',
          path: '/beneficiary',
          role: ['ROLE_ADMIN']
        },
        {
          title: 'Payments',
          path: '/payment',
          role: ['ROLE_ADMIN']
        },
        {
          title: 'Extra users',
          path: '/extra-user',
          role: ['ROLE_ADMIN']
        }
      ]
    },
    {
      title: 'general',
      type: 'header',
      role: ['ROLE_ADMIN', 'ROLE_USER']
    },
    {
      title: 'Home',
      icon: 'fas fa-home',
      active: false,
      type: 'simple',
      path: '',
      role: ['ROLE_ADMIN', 'ROLE_USER']
    },
    {
      title: 'Balances',
      icon: 'fa fa-credit-card',
      active: false,
      type: 'dropdown',
      role: ['ROLE_ADMIN', 'ROLE_USER'],
      submenus: [
        {
          title: 'Add a new balance ',
          path: '/add-balance',
          role: ['ROLE_ADMIN', 'ROLE_USER']
        },
        {
          title: 'details',
          path: '/balances',
          role: ['ROLE_ADMIN', 'ROLE_USER']
        }
      ]
    },
    {
      title: 'BankAccount',
      path: '/bank-account',
      icon: 'fa fa-university',
      active: false,
      type: 'simple',
      role: ['ROLE_USER']
    },
    {
      title: 'Periods',
      icon: 'fa fa-calendar',
      active: false,
      type: 'simple',
      path: '/period',
      role: ['ROLE_USER']
    },
    {
      title: 'Zakats',
      path: '/zakat',
      icon: 'fas fa-hand-holding-usd',
      active: false,
      type: 'simple',
      role: ['ROLE_USER']
    },
    {
      title: 'Beneficiaries',
      icon: 'fa fa-users',
      active: false,
      type: 'dropdown',
      role: ['ROLE_ADMIN', 'ROLE_USER'],
      submenus: [
        {
          title: 'add a new beneficiary',
          path: '/beneficiaries/new',
          badge: {
            text: 'Pro ',
            class: 'badge-success'
          },
          role: ['ROLE_ADMIN', 'ROLE_USER']
        },
        {
          title: 'manage beneficiaries',
          path: '/beneficiary',
          role: ['ROLE_ADMIN', 'ROLE_USER']
        },
        {
          title: 'details',
          path: '/beneficiaries',
          role: ['ROLE_ADMIN', 'ROLE_USER']
        }
      ]
    },
    {
      title: 'Payments',
      path: '/pay-zakat',
      icon: 'fa fa-money',
      active: false,
      type: 'simple',
      role: ['ROLE_ADMIN', 'ROLE_USER']
    },
    {
      title: 'settings',
      type: 'header',
      role: ['ROLE_ADMIN', 'ROLE_USER']
    },
    {
      title: 'Zakat Guide',
      icon: 'fa fa-book',
      active: false,
      type: 'simple',
      path: '/guide',
      role: ['ROLE_ADMIN', 'ROLE_USER']
    },
    {
      title: 'Account',
      icon: 'fa fa-user',
      active: false,
      type: 'dropdown',
      role: ['ROLE_ADMIN', 'ROLE_USER'],
      submenus: [
        {
          title: 'Settings',
          path: '/account/settings',
          role: ['ROLE_ADMIN', 'ROLE_USER']
        },
        {
          title: 'Password',
          path: '/account/password',
          role: ['ROLE_ADMIN', 'ROLE_USER']
        }
      ]
    },
    {
      title: 'Log Out',
      icon: 'fa fa-sign-out',
      active: false,
      type: 'logout',
      role: ['ROLE_ADMIN', 'ROLE_USER']
    }
  ];
  constructor() {}

  toggle() {
    this.toggled = !this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
