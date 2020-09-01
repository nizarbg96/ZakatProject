import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IZakat } from 'app/shared/model/zakat.model';

@Component({
  selector: 'jhi-zakat-detail',
  templateUrl: './zakat-detail.component.html',
  styleUrls: ['./../entities.scss']
})
export class ZakatDetailComponent implements OnInit {
  zakat: IZakat | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ zakat }) => (this.zakat = zakat));
  }

  previousState(): void {
    window.history.back();
  }
}
