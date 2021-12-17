import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot, cold } from '@nrwl/angular/testing';
import { Observable, of, throwError } from 'rxjs';

import { GenresEffects } from './genres.effects';
import {
  Genre,
  getGenreAction,
  getGenreFailureAction,
  getGenreSuccessAction,
} from '@sparky-studios/shared/data-access-genres';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GenreService } from '../service/genre.service';

describe('GenresEffects', () => {
  let actions: Observable<Action>;
  let effects: GenresEffects;
  let genreService: GenreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), HttpClientTestingModule],
      providers: [
        GenresEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        {
          provide: 'domain',
          useValue: '',
        },
      ],
    });

    effects = TestBed.inject(GenresEffects);
    genreService = TestBed.inject(GenreService);
  });

  describe('getGenre$', () => {
    it('should dispatch success action if genre loaded successfully', () => {
      // Arrange
      const getGenre = getGenreAction({ id: '123' });

      const genre = {
        id: '123',
        name: 'test-name',
      } as Genre;

      jest.spyOn(genreService, 'findById').mockReturnValue(of(genre));

      const getGenreSuccess = getGenreSuccessAction({ genre });

      // Act
      actions = hot('a', { a: getGenre });

      // Assert
      expect(effects.getGenre$).toBeObservable(
        cold('a', { a: getGenreSuccess })
      );
    });

    it('should dispatch failure action if genre loading threw error', () => {
      // Arrange
      const getGenre = getGenreAction({ id: '123' });

      jest.spyOn(genreService, 'findById').mockImplementation(() => {
        return throwError('ERROR');
      });

      const getGenreFailure = getGenreFailureAction({
        error: 'Failed to load genre',
      });

      // Act
      actions = hot('a', { a: getGenre });

      // Assert
      expect(effects.getGenre$).toBeObservable(
        cold('a', { a: getGenreFailure })
      );
    });
  });
});
