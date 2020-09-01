import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPayment } from 'app/shared/model/payment.model';

@Component({
  selector: 'jhi-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./../entities.scss']
})
export class PaymentDetailComponent implements OnInit {
  payment: IPayment | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ payment }) => (this.payment = payment));
  }

  previousState(): void {
    window.history.back();
  }
}
