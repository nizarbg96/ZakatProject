import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'jhi-manage-entities',
  templateUrl: './manage-entities.component.html',
  styleUrls: ['./manage-entities.component.scss']
})
export class ManageEntitiesComponent implements OnInit {
  src1 = '../../../content/images/entities/balance.png';
  src2 = '../../../content/images/entities/period.png';
  src3 = '../../../content/images/entities/bankAccount.png';
  src4 = '../../../content/images/entities/zakat.png';
  src5 = '../../../content/images/entities/beneficiaries.png';
  src6 = '../../../content/images/entities/payment.png';
  src7 = '../../../content/images/entities/user.png';
  @Output() scrollToInfo = new EventEmitter<void>();
  constructor() {}
  scrollToInfoTriger() {
    this.scrollToInfo.emit();
  }
  ngOnInit() {}
}
