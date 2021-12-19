import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import { GenresEffects } from './genres.effects';
import { GenresFacade } from './genres.facade';
import { GENRES_FEATURE_KEY, State, reducer } from './genres.reducer';
import { Genre } from './genres.models';
import { getGenreSuccessAction } from './genres.actions';
import { HttpClientTestingModule } from '@angular/common/http/testing';

interface TestSchema {
  genres: State;
}

describe('GenresFacade', () => {
  let facade: GenresFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(GENRES_FEATURE_KEY, reducer),
          EffectsModule.forFeature([GenresEffects]),
        ],
        providers: [GenresFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
          HttpClientTestingModule,
        ],
        providers: [
          {
            provide: 'domain',
            useValue: '',
          },
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(GenresFacade);
    });

    it('getGenre() should return empty list with loading set to true', async () => {
      // Arrange
      let genres = await readFirst(facade.all$);
      let loading = await readFirst(facade.loading$);

      expect(genres.length).toBe(0);
      expect(loading).toBe(false);

      // Act
      facade.getGenre('123');

      // Assert
      genres = await readFirst(facade.all$);
      loading = await readFirst(facade.loading$);

      expect(genres.length).toBe(0);
      expect(loading).toBe(true);
    });

    it('all$ should return the loaded list if there is genres available ', async () => {
      // Arrange
      let genres = await readFirst(facade.all$);
      let loading = await readFirst(facade.loading$);

      expect(genres.length).toBe(0);
      expect(loading).toBe(false);

      store.dispatch(
        getGenreSuccessAction({
          genre: {
            id: '123',
            name: 'test-genre',
          } as Genre,
        })
      );

      // Assert
      genres = await readFirst(facade.all$);
      loading = await readFirst(facade.loading$);

      expect(genres.length).toBe(1);
      expect(loading).toBe(false);
    });
  });
});
