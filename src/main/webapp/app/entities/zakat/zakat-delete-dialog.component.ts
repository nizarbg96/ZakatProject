import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IZakat } from 'app/shared/model/zakat.model';
import { ZakatService } from './zakat.service';

@Component({
  templateUrl: './zakat-delete-dialog.component.html',
  styleUrls: ['./../entities.scss']
})
export class ZakatDeleteDialogComponent {
  zakat?: IZakat;

  constructor(protected zakatService: ZakatService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.zakatService.delete(id).subscribe(() => {
      this.eventManager.broadcast('zakatListModification');
      this.activeModal.close();
    });
  }
}
