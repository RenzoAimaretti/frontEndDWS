import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubscripcionComponent } from './create-subscripcion.component';

describe('CreateSubscripcionComponent', () => {
  let component: CreateSubscripcionComponent;
  let fixture: ComponentFixture<CreateSubscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSubscripcionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSubscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
