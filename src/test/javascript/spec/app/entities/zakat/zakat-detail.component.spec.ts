import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ZakatReminderTestModule } from '../../../test.module';
import { ZakatDetailComponent } from 'app/entities/zakat/zakat-detail.component';
import { Zakat } from 'app/shared/model/zakat.model';

describe('Component Tests', () => {
  describe('Zakat Management Detail Component', () => {
    let comp: ZakatDetailComponent;
    let fixture: ComponentFixture<ZakatDetailComponent>;
    const route = ({ data: of({ zakat: new Zakat(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ZakatReminderTestModule],
        declarations: [ZakatDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ZakatDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ZakatDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load zakat on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.zakat).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
