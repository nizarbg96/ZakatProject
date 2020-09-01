import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Info1Component } from 'app/components/zakat-guide/zakat-guide-info/components/info1/info1.component';
import { Info2Component } from 'app/components/zakat-guide/zakat-guide-info/components/info2/info2.component';
import { Info3Component } from 'app/components/zakat-guide/zakat-guide-info/components/info3/info3.component';
import { Info4Component } from 'app/components/zakat-guide/zakat-guide-info/components/info4/info4.component';
import { Info5Component } from 'app/components/zakat-guide/zakat-guide-info/components/info5/info5.component';
import { Info6Component } from 'app/components/zakat-guide/zakat-guide-info/components/info6/info6.component';
import { MaterialModule } from 'app/material-components/material.module';
import { Route, RouterModule } from '@angular/router';
import { ZakatGuideInfoComponent } from 'app/components/zakat-guide/zakat-guide-info/zakat-guide-info.component';
import { ZakatInfoHeadingComponent } from 'app/components/zakat-guide/zakat-guide-info/zakat-info-heading/zakat-info-heading.component';
import { PortfolioComponent } from 'app/components/zakat-guide/widgets/portfolio/portfolio.component';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DirectivesModule } from 'app/components/zakat-guide/widgets/directives/directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const ZakatInfoRoutes: Route[] = [
  {
    path: 'info1',
    component: Info1Component
  },
  {
    path: 'info2',
    component: Info2Component
  },
  {
    path: 'info3',
    component: Info3Component
  },
  {
    path: 'info4',
    component: Info4Component
  },
  {
    path: 'info5',
    component: Info5Component
  },
  {
    path: 'info6',
    component: Info6Component
  }
];

@NgModule({
  declarations: [
    Info1Component,
    Info2Component,
    Info3Component,
    Info4Component,
    Info5Component,
    Info6Component,
    ZakatGuideInfoComponent,
    ZakatInfoHeadingComponent,
    PortfolioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    MatListModule,
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    DirectivesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    Info1Component,
    Info2Component,
    Info3Component,
    Info4Component,
    Info5Component,
    Info6Component,
    ZakatGuideInfoComponent,
    ZakatInfoHeadingComponent,
    PortfolioComponent
  ]
})
export class ZakatGuideInfoModule {}
