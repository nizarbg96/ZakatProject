import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZakatAlertComponent } from './zakat-alert/zakat-alert.component';
import { NgbAlert, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ZakatAlertComponent],
  exports: [ZakatAlertComponent],
  imports: [CommonModule, NgbModule]
})
export class BootstrapComponentsModule {}
