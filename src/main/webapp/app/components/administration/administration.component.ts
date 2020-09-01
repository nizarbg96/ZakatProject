import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'jhi-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  src1 = '../../../content/images/jhipster_family_member_1.svg';
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
