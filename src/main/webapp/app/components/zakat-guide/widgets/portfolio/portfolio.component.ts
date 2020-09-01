import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  src1 = '../../../../../content/images/zakat-info/who-pay-zakat.jpg';
  src2 = '../../../../../content/images/zakat-info/what-is-nisab.jpg';
  src3 = '../../../../../content/images/zakat-info/when-to-pay.jpg';
  src4 = '../../../../../content/images/zakat-info/beneficiary.jpg';
  src5 = '../../../../../content/images/zakat-info/zakat-dept.jpg';
  src6 = '../../../../../content/images/zakat-info/zakat-assets.jpg';
  @Output() scrollToInfo = new EventEmitter<void>();
  constructor() {}
  scrollToInfoTriger() {
    this.scrollToInfo.emit();
  }
  ngOnInit() {}
}
