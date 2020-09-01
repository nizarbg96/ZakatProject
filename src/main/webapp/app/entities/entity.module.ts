import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/material-components/material.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'bank-account',
        loadChildren: () => import('./bank-account/bank-account.module').then(m => m.ZakatReminderBankAccountModule)
      },
      {
        path: 'balance',
        loadChildren: () => import('./balance/balance.module').then(m => m.ZakatReminderBalanceModule)
      },
      {
        path: 'period',
        loadChildren: () => import('./period/period.module').then(m => m.ZakatReminderPeriodModule)
      },
      {
        path: 'zakat',
        loadChildren: () => import('./zakat/zakat.module').then(m => m.ZakatReminderZakatModule)
      },
      {
        path: 'payment',
        loadChildren: () => import('./payment/payment.module').then(m => m.ZakatReminderPaymentModule)
      },
      {
        path: 'beneficiary',
        loadChildren: () => import('./beneficiary/beneficiary.module').then(m => m.ZakatReminderBeneficiaryModule)
      },
      {
        path: 'extra-user',
        loadChildren: () => import('./extra-user/extra-user.module').then(m => m.ZakatReminderExtraUserModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class ZakatReminderEntityModule {}
