import { Action } from '@ngrx/store';

import { Genre } from './genres.models';
import { initialState, reducer } from './genres.reducer';
import { getGenreAction, getGenreSuccessAction } from './genres.actions';

describe('Genres Reducer', () => {
  describe('valid Genres actions', () => {
    it('getGenreAction sets loading to true', () => {
      // Arrange
      const action = getGenreAction({ id: '123' });

      // Act
      const result = reducer(initialState, action);

      // Assert
      expect(result.loading).toBe(true);
      expect(result.entities).toMatchObject({});
    });

    it('getGenreSuccessAction should add the genre of the list of entities', () => {
      // Arrange
      const genre: Genre = {
        id: '123',
        name: 'test-genre',
      } as Genre;

      const action = getGenreSuccessAction({ genre });

      // Act
      const result = reducer(initialState, action);

      // Assert
      expect(result.loading).toBe(false);
      expect(result.entities).toStrictEqual({ '123': genre });
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      // Arrange
      const action = {} as Action;

      // Act
      const result = reducer(initialState, action);

      // Assert
      expect(result).toBe(initialState);
    });
  });
});
