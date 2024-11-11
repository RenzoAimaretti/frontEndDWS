import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaMpCheckoutProComponent } from './prueba-mp-checkout-pro.component';

describe('PruebaMpCheckoutProComponent', () => {
  let component: PruebaMpCheckoutProComponent;
  let fixture: ComponentFixture<PruebaMpCheckoutProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruebaMpCheckoutProComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PruebaMpCheckoutProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
