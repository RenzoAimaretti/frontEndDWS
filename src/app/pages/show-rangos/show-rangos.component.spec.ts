import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRangosComponent } from './show-rangos.component';

describe('ShowRangosComponent', () => {
  let component: ShowRangosComponent;
  let fixture: ComponentFixture<ShowRangosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowRangosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowRangosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
