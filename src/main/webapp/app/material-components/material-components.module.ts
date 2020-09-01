import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBankAccountStepperComponent } from 'app/material-components/add-bank-account-stepper/add-bank-account-stepper.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CdkTableModule } from '@angular/cdk/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpanationPanelComponent } from './expanation-panel/expanation-panel.component';
import { DashboardZakatTableComponent } from './dashboard-zakat-table/dashboard-zakat-table.component';
import { BalancesByPeriodComponent } from './balances-by-period/balances-by-period.component';
import { MaterialModule } from 'app/material-components/material.module';
import { BeneficiariesTableComponent } from 'app/material-components/beneficiaries-table/beneficiaries-table.component';
import { BeneficiaryPaymentsTableComponent } from 'app/material-components/beneficiary-payments-table/beneficiary-payments-table.component';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from 'app/material-components/add-bank-account-stepper/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AddBankAccountStepperComponent,
    ExpanationPanelComponent,
    DashboardZakatTableComponent,
    BalancesByPeriodComponent,
    BeneficiariesTableComponent,
    BeneficiaryPaymentsTableComponent,
    LoadingSpinnerComponent
  ],
  exports: [
    AddBankAccountStepperComponent,
    ExpanationPanelComponent,
    DashboardZakatTableComponent,
    BalancesByPeriodComponent,
    BeneficiariesTableComponent,
    BeneficiaryPaymentsTableComponent,
    LoadingSpinnerComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule, FormsModule]
})
export class MaterialComponentsModule {}
