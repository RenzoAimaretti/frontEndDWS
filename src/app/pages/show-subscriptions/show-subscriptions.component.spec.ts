import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSubscriptionsComponent } from './show-subscriptions.component';

describe('ShowSubscriptionsComponent', () => {
  let component: ShowSubscriptionsComponent;
  let fixture: ComponentFixture<ShowSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowSubscriptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
