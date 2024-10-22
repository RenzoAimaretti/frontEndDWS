import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSubscripcionComponent } from './editar-subscripcion.component';

describe('EditarSubscripcionComponent', () => {
  let component: EditarSubscripcionComponent;
  let fixture: ComponentFixture<EditarSubscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarSubscripcionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarSubscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
