import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'jhi-zakat-guide-info',
  templateUrl: './zakat-guide-info.component.html',
  styleUrls: ['./zakat-guide-info.component.scss']
})
export class ZakatGuideInfoComponent implements OnInit {
  src1 = '../../../../content/images/zakat-png-7.png';
  @ViewChild('about', { static: true }) aboutView: ElementRef;

  constructor() {}

  ngOnInit() {
    this.scrollToElement(this.aboutView.nativeElement);
  }

  scrollToElement($element): void {
    setTimeout(() => {
      $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }, 500);
  }
}
