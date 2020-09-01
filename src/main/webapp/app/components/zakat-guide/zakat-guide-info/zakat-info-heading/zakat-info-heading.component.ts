import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'jhi-zakat-info-heading',
  templateUrl: './zakat-info-heading.component.html',
  styleUrls: ['./zakat-info-heading.component.scss']
})
export class ZakatInfoHeadingComponent implements OnInit {
  isHeading = true;
  isSubheading = true;
  isHeadingBtn = true;
  @Output() scrollToguideFromHeading = new EventEmitter<void>();
  constructor() {}

  ngOnInit() {}
  scrollToGuide() {
    this.scrollToguideFromHeading.emit();
  }
}
