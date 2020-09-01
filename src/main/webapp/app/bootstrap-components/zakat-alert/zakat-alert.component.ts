import { Component, OnInit } from '@angular/core';
import { ZakatService } from 'app/entities/zakat/zakat.service';
import { AccountService } from 'app/core/auth/account.service';
import { Zakat } from 'app/shared/model/zakat.model';
import { DashboardService } from 'app/dashboard/dashboard.service';
interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'jhi-zakat-alert',
  templateUrl: './zakat-alert.component.html',
  styleUrls: ['./zakat-alert.component.scss']
})
export class ZakatAlertComponent implements OnInit {
  resetAlert: Alert[];
  alerts: Alert[];
  resetButton: boolean = false;

  constructor(private zakatService: ZakatService, private accountService: AccountService, private dashboardService: DashboardService) {}

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
    this.dashboardService.alertsSize.next(this.alerts.length);
    this.resetButton = true;
  }

  reset() {
    this.alerts = Array.from(this.resetAlert);
    setTimeout(() => {
      this.resetButton = false;
    }, 1000);
    this.resetButton = true;
  }
  ngOnInit() {
    this.accountService.getAuthenticationState().subscribe(account => {
      this.zakatService.getZakatByLogin(account.login).subscribe(zakats => {
        const zakatToPay: Zakat[] = zakats;
        const filtredZakat = zakatToPay.slice().filter(zakat => zakat.remainingAmount > 0);
        const ALERTS: Alert[] = [];
        if (filtredZakat.length === 0) {
          ALERTS.push({ type: 'success', message: 'You have no zakat to pay' });
        } else {
          ALERTS.push({ type: 'danger', message: "You haven't payed yet " + filtredZakat.length + ' Zakats' });
          filtredZakat.forEach(zakat => {
            ALERTS.push({
              type: 'warning',
              message:
                'You have to pay the Zakat with ID ' +
                zakat.id +
                ': Due Amount = ' +
                zakat.dueAmount +
                ' TND' +
                ' / Remaining Amount = ' +
                zakat.remainingAmount +
                ' TND' +
                ' .'
            });
          });
        }
        this.alerts = Array.from(ALERTS);
        this.resetAlert = ALERTS;
        this.dashboardService.alertsSize.next(this.alerts.length);
      });
    });
  }
}
