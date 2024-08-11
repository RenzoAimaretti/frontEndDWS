import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrouselSpotlightComponent } from './carrousel-spotlight.component';

describe('CarrouselSpotlightComponent', () => {
  let component: CarrouselSpotlightComponent;
  let fixture: ComponentFixture<CarrouselSpotlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrouselSpotlightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarrouselSpotlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
