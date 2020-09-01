import { Route } from '@angular/router';
import { SidebarComponent } from 'app/layouts/sidebar/sidebar.component';

export const SIDEBAR_ROUTE: Route = {
  path: '',
  component: SidebarComponent,
  data: {
    authorities: [],
    pageTitle: 'sidebar.title'
  },
  outlet: 'sidebar'
};
