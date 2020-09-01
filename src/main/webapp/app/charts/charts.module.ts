import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceChartComponent } from 'app/charts/balance-chart/balance-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgChartjsModule } from 'ng-chartjs';
import { MyChartComponent } from './my-chart/my-chart.component';
import { PluginComponent } from 'app/charts/plugin/plugin.component';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import { GlobalPluginComponent } from 'app/charts/global-plugin/global-plugin.component';
import { ColumnsChartComponent } from './columns-chart/columns-chart.component';
const chartAnnotation = ChartAnnotation;

@NgModule({
  declarations: [BalanceChartComponent, MyChartComponent, PluginComponent, GlobalPluginComponent, ColumnsChartComponent],
  imports: [CommonModule, HighchartsChartModule, NgChartjsModule.registerPlugin([chartAnnotation])],
  exports: [BalanceChartComponent, MyChartComponent, PluginComponent, GlobalPluginComponent, ColumnsChartComponent]
})
export class ChartsModule {}
