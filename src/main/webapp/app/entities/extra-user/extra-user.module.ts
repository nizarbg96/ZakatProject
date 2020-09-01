import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ZakatReminderSharedModule } from 'app/shared/shared.module';
import { ExtraUserComponent } from './extra-user.component';
import { ExtraUserDetailComponent } from './extra-user-detail.component';
import { ExtraUserUpdateComponent } from './extra-user-update.component';
import { ExtraUserDeleteDialogComponent } from './extra-user-delete-dialog.component';
import { extraUserRoute } from './extra-user.route';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [ZakatReminderSharedModule, RouterModule.forChild(extraUserRoute), MatCardModule],
  declarations: [ExtraUserComponent, ExtraUserDetailComponent, ExtraUserUpdateComponent, ExtraUserDeleteDialogComponent],
  entryComponents: [ExtraUserDeleteDialogComponent]
})
export class ZakatReminderExtraUserModule {}
