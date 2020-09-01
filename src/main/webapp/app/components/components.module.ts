import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBalanceComponent } from 'app/components/add-balance/add-balance.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ZakatReminderSharedModule } from 'app/shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { AddBeneficiaryDialogComponent, PayZakatComponent } from './pay-zakat/pay-zakat.component';
import { MaterialComponentsModule } from 'app/material-components/material-components.module';
import { MaterialModule } from 'app/material-components/material.module';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { AddBeneficiaryComponent } from './beneficiaries/add-beneficiary/add-beneficiary.component';
import { InfoBeneficaryTableComponent } from './beneficiaries/info-beneficary-table/info-beneficary-table.component';
import { BalancesComponent } from './balances/balances.component';
import { ChartsModule } from 'app/charts/charts.module';
import { ZakatGuideComponent } from './zakat-guide/zakat-guide.component';
import { Zakat } from 'app/shared/model/zakat.model';
import { MatListModule } from '@angular/material/list';
import { PortfolioComponent } from 'app/components/zakat-guide/widgets/portfolio/portfolio.component';
import { AboutComponent } from 'app/components/zakat-guide/widgets/about/about.component';
import { HeadingComponent } from 'app/components/zakat-guide/widgets/heading/heading.component';
import { PricingComponent } from 'app/components/zakat-guide/widgets/pricing/pricing.component';
import { BlogComponent } from 'app/components/zakat-guide/widgets/blog/blog.component';
import { ContactComponent } from 'app/components/zakat-guide/widgets/contact/contact.component';
import { ContactDialogComponent } from 'app/components/zakat-guide/widgets/contact-dialog/contact-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DirectivesModule } from 'app/components/zakat-guide/widgets/directives/directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZakatGuideInfoComponent } from './zakat-guide/zakat-guide-info/zakat-guide-info.component';
import { ZakatGuideInfoModule, ZakatInfoRoutes } from 'app/components/zakat-guide/zakat-guide-info/zakat-guide-info.module';
import { AdministrationComponent } from './administration/administration.component';
import { ManageEntitiesComponent } from './manage-entities/manage-entities.component';
import { AdminPortfolioComponent } from './administration/admin-portfolio/admin-portfolio.component';

@NgModule({
  declarations: [
    AddBalanceComponent,
    PayZakatComponent,
    BeneficiariesComponent,
    AddBeneficiaryComponent,
    InfoBeneficaryTableComponent,
    BalancesComponent,
    ZakatGuideComponent,
    AboutComponent,
    HeadingComponent,
    PricingComponent,
    BlogComponent,
    ContactComponent,
    ContactDialogComponent,
    AddBeneficiaryDialogComponent,
    AdministrationComponent,
    ManageEntitiesComponent,
    AdminPortfolioComponent
  ],
  entryComponents: [ContactDialogComponent, AddBeneficiaryDialogComponent],
  imports: [
    RouterModule.forChild([{ path: 'add-balance', component: AddBalanceComponent }]),
    RouterModule.forChild([{ path: 'pay-zakat', component: PayZakatComponent }]),
    RouterModule.forChild([{ path: 'beneficiaries', component: BeneficiariesComponent }]),
    RouterModule.forChild([{ path: 'beneficiaries/new', component: AddBeneficiaryComponent }]),
    RouterModule.forChild([{ path: 'balances', component: BalancesComponent }]),
    RouterModule.forChild([{ path: 'guide', component: ZakatGuideComponent }]),
    RouterModule.forChild([{ path: 'guide/info', component: ZakatGuideInfoComponent, children: ZakatInfoRoutes }]),
    RouterModule.forChild([{ path: 'administration', component: AdministrationComponent }]),
    RouterModule.forChild([{ path: 'manage-entities', component: ManageEntitiesComponent }]),
    ZakatReminderSharedModule,
    MaterialComponentsModule,
    MaterialModule,
    ChartsModule,
    MatListModule,
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    DirectivesModule,
    FormsModule,
    ReactiveFormsModule,
    ZakatGuideInfoModule
  ]
})
export class ComponentsModule {}
