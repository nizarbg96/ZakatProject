import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ZakatReminderSharedModule } from 'app/shared/shared.module';
import { PeriodComponent } from './period.component';
import { PeriodDetailComponent } from './period-detail.component';
import { PeriodUpdateComponent } from './period-update.component';
import { PeriodDeleteDialogComponent } from './period-delete-dialog.component';
import { periodRoute } from './period.route';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [ZakatReminderSharedModule, RouterModule.forChild(periodRoute), MatCardModule],
  declarations: [PeriodComponent, PeriodDetailComponent, PeriodUpdateComponent, PeriodDeleteDialogComponent],
  entryComponents: [PeriodDeleteDialogComponent]
})
export class ZakatReminderPeriodModule {}
