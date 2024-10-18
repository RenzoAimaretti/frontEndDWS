import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRangoCinefiloComponent } from './create-rango-cinefilo.component';

describe('CreateRangoCinefiloComponent', () => {
  let component: CreateRangoCinefiloComponent;
  let fixture: ComponentFixture<CreateRangoCinefiloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRangoCinefiloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRangoCinefiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
