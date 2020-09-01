import { Component, OnInit } from '@angular/core';
import { IBeneficiary } from 'app/shared/model/beneficiary.model';
import { PayZakatService } from 'app/components/pay-zakat/pay-zakat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.scss']
})
export class BeneficiariesComponent implements OnInit {
  avatarUrl = '../../../content/images/avatar.svg';
  selectedBeneficiary: IBeneficiary;

  constructor(private payZakatService: PayZakatService, private router: Router) {}

  ngOnInit() {}

  giveZakat() {
    this.router.navigateByUrl('/pay-zakat').then(() => {
      this.payZakatService.give.next(this.selectedBeneficiary);
    });
  }
}
