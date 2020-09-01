import { ChangeDetectorRef, Component, ElementRef, Inject, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { SE } from './widgets/directives/scroll.directive';
import { ContactDialogComponent } from 'app/components/zakat-guide/widgets/contact-dialog/contact-dialog.component';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'jhi-zakat-guide',
  templateUrl: './zakat-guide.component.html',
  styleUrls: ['./zakat-guide.component.scss']
})
export class ZakatGuideComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  @ViewChild('guide1', { static: true }) guideView1: ElementRef;
  @ViewChild('guide2', { static: true }) guideView2: ElementRef;
  @ViewChild('guide3', { static: true }) guideView3: ElementRef;
  private _mobileQueryListener: () => void;

  constructor(@Inject(DOCUMENT) document, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {}

  scrollDecision(event: number) {
    console.log('event detected' + event);
    if (event == 1) {
      this.scrollToElement(this.guideView1.nativeElement);
    } else if (event == 2) {
      this.scrollToElement(this.guideView2.nativeElement);
    } else if (event == 3) {
      this.scrollToElement(this.guideView3.nativeElement);
    }
  }
  scrollToElement($element): void {
    setTimeout(() => {
      $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }, 500);
  }
}
