import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCommentFormComponent } from './review-comment-form.component';

describe('ReviewCommentFormComponent', () => {
  let component: ReviewCommentFormComponent;
  let fixture: ComponentFixture<ReviewCommentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewCommentFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
