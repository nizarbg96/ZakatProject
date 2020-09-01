import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {
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
