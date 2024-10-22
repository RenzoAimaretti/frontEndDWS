import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsManagerComponent } from './suggestions-manager.component';

describe('SuggestionsManagerComponent', () => {
  let component: SuggestionsManagerComponent;
  let fixture: ComponentFixture<SuggestionsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionsManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuggestionsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
