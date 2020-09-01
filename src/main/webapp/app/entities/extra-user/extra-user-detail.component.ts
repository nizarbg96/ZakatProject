import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExtraUser } from 'app/shared/model/extra-user.model';

@Component({
  selector: 'jhi-extra-user-detail',
  templateUrl: './extra-user-detail.component.html',
  styleUrls: ['./../entities.scss']
})
export class ExtraUserDetailComponent implements OnInit {
  extraUser: IExtraUser | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ extraUser }) => (this.extraUser = extraUser));
  }

  previousState(): void {
    window.history.back();
  }
}
