import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExtraUser } from 'app/shared/model/extra-user.model';
import { ExtraUserService } from './extra-user.service';

@Component({
  templateUrl: './extra-user-delete-dialog.component.html',
  styleUrls: ['./../entities.scss']
})
export class ExtraUserDeleteDialogComponent {
  extraUser?: IExtraUser;

  constructor(protected extraUserService: ExtraUserService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.extraUserService.delete(id).subscribe(() => {
      this.eventManager.broadcast('extraUserListModification');
      this.activeModal.close();
    });
  }
}
