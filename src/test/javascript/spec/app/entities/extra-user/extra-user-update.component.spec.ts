import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ZakatReminderTestModule } from '../../../test.module';
import { ExtraUserUpdateComponent } from 'app/entities/extra-user/extra-user-update.component';
import { ExtraUserService } from 'app/entities/extra-user/extra-user.service';
import { ExtraUser } from 'app/shared/model/extra-user.model';

describe('Component Tests', () => {
  describe('ExtraUser Management Update Component', () => {
    let comp: ExtraUserUpdateComponent;
    let fixture: ComponentFixture<ExtraUserUpdateComponent>;
    let service: ExtraUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ZakatReminderTestModule],
        declarations: [ExtraUserUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ExtraUserUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExtraUserUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExtraUserService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ExtraUser(123);
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
        const entity = new ExtraUser();
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
