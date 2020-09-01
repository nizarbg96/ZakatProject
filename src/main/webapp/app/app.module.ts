import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { ZakatReminderSharedModule } from 'app/shared/shared.module';
import { ZakatReminderCoreModule } from 'app/core/core.module';
import { ZakatReminderAppRoutingModule } from './app-routing.module';
import { ZakatReminderHomeModule } from './home/home.module';
import { ZakatReminderEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { SidebarModule } from 'app/layouts/sidebar/sidebar.module';
import { ComponentsModule } from 'app/components/components.module';
import { RouterModule } from '@angular/router';
import { AddBalanceComponent } from 'app/components/add-balance/add-balance.component';
import { MaterialModule } from 'app/material-components/material.module';

@NgModule({
  imports: [
    BrowserModule,
    ZakatReminderSharedModule,
    ZakatReminderCoreModule,
    ZakatReminderHomeModule,
    ComponentsModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    ZakatReminderEntityModule,
    ZakatReminderAppRoutingModule,
    SidebarModule,
    MaterialModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  exports: [],
  bootstrap: [MainComponent]
})
export class ZakatReminderAppModule {}
