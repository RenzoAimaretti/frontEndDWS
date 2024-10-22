import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRangoCinefiloComponent } from './editar-rango-cinefilo.component';

describe('EditarRangoCinefiloComponent', () => {
  let component: EditarRangoCinefiloComponent;
  let fixture: ComponentFixture<EditarRangoCinefiloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarRangoCinefiloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarRangoCinefiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
