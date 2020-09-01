import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ZakatReminderSharedModule } from 'app/shared/shared.module';
import { BankAccountComponent } from './bank-account.component';
import { BankAccountDetailComponent } from './bank-account-detail.component';
import { BankAccountUpdateComponent } from './bank-account-update.component';
import { BankAccountDeleteDialogComponent } from './bank-account-delete-dialog.component';
import { bankAccountRoute } from './bank-account.route';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [ZakatReminderSharedModule, RouterModule.forChild(bankAccountRoute), MatCardModule],
  declarations: [BankAccountComponent, BankAccountDetailComponent, BankAccountUpdateComponent, BankAccountDeleteDialogComponent],
  entryComponents: [BankAccountDeleteDialogComponent]
})
export class ZakatReminderBankAccountModule {}
