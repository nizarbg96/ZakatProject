import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ZakatReminderTestModule } from '../../../test.module';
import { ZakatUpdateComponent } from 'app/entities/zakat/zakat-update.component';
import { ZakatService } from 'app/entities/zakat/zakat.service';
import { Zakat } from 'app/shared/model/zakat.model';

describe('Component Tests', () => {
  describe('Zakat Management Update Component', () => {
    let comp: ZakatUpdateComponent;
    let fixture: ComponentFixture<ZakatUpdateComponent>;
    let service: ZakatService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ZakatReminderTestModule],
        declarations: [ZakatUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ZakatUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ZakatUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ZakatService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Zakat(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Zakat();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
