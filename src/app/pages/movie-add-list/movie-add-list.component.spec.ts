import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieAddListComponent } from './movie-add-list.component';

describe('MovieAddListComponent', () => {
  let component: MovieAddListComponent;
  let fixture: ComponentFixture<MovieAddListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieAddListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieAddListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
