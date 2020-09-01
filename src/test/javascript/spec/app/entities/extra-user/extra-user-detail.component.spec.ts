import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ZakatReminderTestModule } from '../../../test.module';
import { ExtraUserDetailComponent } from 'app/entities/extra-user/extra-user-detail.component';
import { ExtraUser } from 'app/shared/model/extra-user.model';

describe('Component Tests', () => {
  describe('ExtraUser Management Detail Component', () => {
    let comp: ExtraUserDetailComponent;
    let fixture: ComponentFixture<ExtraUserDetailComponent>;
    const route = ({ data: of({ extraUser: new ExtraUser(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ZakatReminderTestModule],
        declarations: [ExtraUserDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ExtraUserDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExtraUserDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load extraUser on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.extraUser).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
