import { Component, OnInit } from '@angular/core';
import { Account } from 'app/core/user/account.model';
import { BalanceService } from 'app/entities/balance/balance.service';
import { AccountService } from 'app/core/auth/account.service';
import { ChartsService } from 'app/charts/charts.service';
import * as Highcharts from 'highcharts';
import { IBalance } from 'app/shared/model/balance.model';

@Component({
  selector: 'jhi-columns-chart',
  templateUrl: './columns-chart.component.html',
  styleUrls: ['./columns-chart.component.scss']
})
export class ColumnsChartComponent implements OnInit {
  account: Account | null = null;
  Highcharts = Highcharts;
  chartOptions: {};
  constructor(private balanceService: BalanceService, private accountService: AccountService, private chartService: ChartsService) {}

  ngOnInit() {
    this.accountService.getAuthenticationState().subscribe(account => {
      this.balanceService.findAllByLogin(account.login).subscribe(res => {
        this.assignChartOptions(this.chartService.sortBalanceArrayByDate(res.body));
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 300);
      });
    });
  }
  assignChartOptions(data: IBalance[]) {
    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        type: 'category',
        labels: {
          rotation: -45,
          style: {
            fontSize: '13px',
            fontFamily: 'Roboto, sans-serif'
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'balance ammount (TND)'
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormat: 'balance ammount: <b>{point.y:.1f} TND</b>'
      },
      series: [
        {
          name: 'date',
          data: data.map(balance => [balance.balanceDate.format('DD-MM-YYYY'), balance.balanceAmount]),
          dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
              fontSize: '13px',
              fontFamily: 'Roboto, sans-serif'
            }
          }
        }
      ]
    };
  }
}
