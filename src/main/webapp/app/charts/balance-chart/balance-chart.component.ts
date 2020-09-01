import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { BalanceService } from 'app/entities/balance/balance.service';
import { IBalance } from 'app/shared/model/balance.model';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { ChartsService } from 'app/charts/charts.service';
import { AddBalanceService } from 'app/services/add-balance.service';

@Component({
  selector: 'jhi-balance-chart',
  templateUrl: './balance-chart.component.html',
  styleUrls: ['./balance-chart.component.scss']
})
export class BalanceChartComponent implements OnInit, OnChanges {
  account: Account | null = null;
  Highcharts = Highcharts;
  @Input() balancesToLoad: IBalance[] = [];
  chartOptions: {};
  constructor(private balanceService: BalanceService, private accountService: AccountService, private chartService: ChartsService) {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.assignChartOptions(this.chartService.sortBalanceArrayByDate(this.balancesToLoad));
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }

  assignChartOptions(data: IBalance[]) {
    this.chartOptions = {
      chart: {
        type: 'area'
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        categories: data.map(balance => balance.balanceDate.format('dddd Do MMMM, YYYY')),
        tickmarkPlacement: 'on',
        title: {
          enabled: false
        }
      },
      yAxis: {
        title: {
          text: 'Million'
        },
        labels: {
          formatter: function() {
            return this.value / 1000;
          }
        }
      },
      tooltip: {
        split: true,
        valueSuffix: ' TND'
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#666666'
          }
        }
      },
      series: [
        {
          name: 'Balance',
          data: data.map(object => object.balanceAmount)
        }
      ]
    };
  }
}
