import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ZakatReminderSharedModule } from 'app/shared/shared.module';
import { BalanceComponent } from './balance.component';
import { BalanceDetailComponent } from './balance-detail.component';
import { BalanceUpdateComponent } from './balance-update.component';
import { BalanceDeleteDialogComponent } from './balance-delete-dialog.component';
import { balanceRoute } from './balance.route';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [ZakatReminderSharedModule, RouterModule.forChild(balanceRoute), MatCardModule],
  declarations: [BalanceComponent, BalanceDetailComponent, BalanceUpdateComponent, BalanceDeleteDialogComponent],
  entryComponents: [BalanceDeleteDialogComponent]
})
export class ZakatReminderBalanceModule {}
