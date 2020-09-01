import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'jhi-admin-portfolio',
  templateUrl: './admin-portfolio.component.html',
  styleUrls: ['./admin-portfolio.component.scss']
})
export class AdminPortfolioComponent implements OnInit {
  src1 = '../../../../content/images/zakat-info/who-pay-zakat.jpg';
  src2 = '../../../../content/images/zakat-info/what-is-nisab.jpg';
  src3 = '../../../../content/images/zakat-info/when-to-pay.jpg';
  src4 = '../../../../content/images/zakat-info/beneficiary.jpg';
  src5 = '../../../../content/images/zakat-info/zakat-dept.jpg';
  src6 = '../../../../content/images/zakat-info/zakat-assets.jpg';

  constructor() {}
  ngOnInit() {}
}
