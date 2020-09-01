import { AddAccountDialog, DashboardComponent } from 'app/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'app/charts/charts.module';
import { BootstrapComponentsModule } from 'app/bootstrap-components/bootstrap-components.module';
import { MaterialModule } from 'app/material-components/material.module';
import { MaterialComponentsModule } from 'app/material-components/material-components.module';
import { LatestDepositsComponent } from './dashboard-components/latest-deposits/latest-deposits.component';
import { SearchComponent } from './dashboard-components/search/search.component';
import { DashboardCardsComponent } from './dashboard-components/dashboard-cards/dashboard-cards.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DashboardComponent, AddAccountDialog, LatestDepositsComponent, SearchComponent, DashboardCardsComponent],
  entryComponents: [AddAccountDialog],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MaterialComponentsModule,
    ChartsModule,
    BootstrapComponentsModule,
    RouterModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule {}
