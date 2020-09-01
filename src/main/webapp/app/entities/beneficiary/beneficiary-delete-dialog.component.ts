import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBeneficiary } from 'app/shared/model/beneficiary.model';
import { BeneficiaryService } from './beneficiary.service';

@Component({
  templateUrl: './beneficiary-delete-dialog.component.html',
  styleUrls: ['./../entities.scss']
})
export class BeneficiaryDeleteDialogComponent {
  beneficiary?: IBeneficiary;

  constructor(
    protected beneficiaryService: BeneficiaryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.beneficiaryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('beneficiaryListModification');
      this.activeModal.close();
    });
  }
}
