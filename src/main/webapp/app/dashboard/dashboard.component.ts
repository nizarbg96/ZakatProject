import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SidebarService } from 'app/layouts/sidebar/sidebar.service';
import { Account } from 'app/core/user/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { IBankAccount } from 'app/shared/model/bank-account.model';
import { DashboardService } from 'app/dashboard/dashboard.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BalanceService } from 'app/entities/balance/balance.service';
import { IBalance } from 'app/shared/model/balance.model';
import { Subscription } from 'rxjs';
import { CollapseModule, WavesModule } from 'angular-bootstrap-md';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'jhi-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  bankAccount: IBankAccount | null = null;
  account: Account | null = null;
  userId: number = 0;
  animal: string;
  name: string;
  subsc: Subscription;
  alertsSize: number = 1;
  card3 = '../../../../../content/images/admin-card.jpg';
  card2 = '../../../../../content/images/entities-card.jpg';

  constructor(
    private sidebarservice: SidebarService,
    private accountService: AccountService,
    private dashboardService: DashboardService,
    private router: Router,
    public dialog: MatDialog,
    private balanceService: BalanceService
  ) {}

  ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    this.dashboardService.loadCurrentBankAccount().subscribe(bankAccount => {
      this.bankAccount = bankAccount.body;
    });
    this.dashboardService.alertsSize.subscribe(alertSize => {
      this.alertsSize = alertSize;
    });
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddAccountDialog, {
      width: '700px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
@Component({
  selector: 'add-account-dialog',
  templateUrl: './add-account-dialog.html'
})
export class AddAccountDialog implements OnInit, OnDestroy {
  subsc: Subscription;

  constructor(
    public dialogRef: MatDialogRef<AddAccountDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subsc = this.dashboardService.closeDialog.subscribe(() => {
      this.dialogRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['']);
      });
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subsc.unsubscribe();
  }
}
