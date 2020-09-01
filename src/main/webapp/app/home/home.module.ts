import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ZakatReminderSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { DashboardModule } from 'app/dashboard/dashboard.module';
import { AddBalanceComponent } from 'app/components/add-balance/add-balance.component';
import { ZakatReminderAppModule } from 'app/app.module';
import { MaterialModule } from 'app/material-components/material.module';

@NgModule({
  imports: [ZakatReminderSharedModule, RouterModule.forChild([HOME_ROUTE]), DashboardModule, MaterialModule],
  declarations: [HomeComponent]
})
export class ZakatReminderHomeModule {}
