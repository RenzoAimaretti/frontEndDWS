import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubscriptionComponent } from './create-subscription.component';

describe('CreateSubscripcionComponent', () => {
  let component: CreateSubscriptionComponent;
  let fixture: ComponentFixture<CreateSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSubscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
