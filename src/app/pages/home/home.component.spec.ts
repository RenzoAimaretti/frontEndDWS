import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { TmdbService } from '../../services/tmdb-service.service';
import { of } from 'rxjs';
import { CarrouselComponent } from '../../shared/carrousel/carrousel.component';
import { CarrouselSpotlightComponent } from '../../shared/carrousel-spotlight/carrousel-spotlight.component';
import { SuggestionsComponent } from '../../shared/suggestions/suggestions.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let tmdbService: jasmine.SpyObj<TmdbService>;

  beforeEach(async () => {
    const tmdbServiceSpy = jasmine.createSpyObj('TmdbService', [
      'getPopularMovies',
      'getTopRatedMovies',
      'getUpcomingMovies',
    ]);

    await TestBed.configureTestingModule({
      declarations: [],
      providers: [{ provide: TmdbService, useValue: tmdbServiceSpy }],
      imports: [
        HttpClientModule, // Importa HttpClientModule aquí
        HomeComponent,
        CarrouselComponent,
        CarrouselSpotlightComponent,
        SuggestionsComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    tmdbService = TestBed.inject(TmdbService) as jasmine.SpyObj<TmdbService>;

    tmdbService.getPopularMovies.and.returnValue(of([]));
    tmdbService.getTopRatedMovies.and.returnValue(of([]));
    tmdbService.getUpcomingMovies.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load popular movies on init', () => {
    expect(tmdbService.getPopularMovies).toHaveBeenCalled();
  });

  it('should load top rated movies on init', () => {
    expect(tmdbService.getTopRatedMovies).toHaveBeenCalled();
  });

  it('should load upcoming movies on init', () => {
    expect(tmdbService.getUpcomingMovies).toHaveBeenCalled();
  });

  it('should get suggestions on init', () => {
    const suggestionsElement =
      fixture.nativeElement.querySelector('app-suggestions');
    expect(suggestionsElement).not.toBeNull();
  });
});
