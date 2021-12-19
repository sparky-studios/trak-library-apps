import { Genre } from './genres.models';
import {
  genresAdapter,
  GenresPartialState,
  initialState,
} from './genres.reducer';
import {
  getAll,
  getAllAsDictionary,
  getError,
  getLoading,
  getSelected,
  getSelectedId,
} from './genres.selectors';

describe('Genres Selectors', () => {
  const errorMessage = 'No Error Available';

  const createGenre = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as Genre);

  let state: GenresPartialState;

  beforeEach(() => {
    state = {
      genres: genresAdapter.setAll(
        [
          createGenre('PRODUCT-AAA'),
          createGenre('PRODUCT-BBB'),
          createGenre('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          loading: true,
          saving: true,
          error: errorMessage,
        }
      ),
    };
  });

  describe('Genres Selectors', () => {
    it('getLoading() should return the current loading state', () => {
      // Act
      const loading = getLoading(state);

      // Assert
      expect(loading).toBeTruthy();
    });

    it('getSaving() should return the current saving state', () => {
      // Act
      const saving = getLoading(state);

      // Assert
      expect(saving).toBeTruthy();
    });

    it('getError() should return the current error message', () => {
      // Act
      const error = getError(state);

      // Assert
      expect(error).toEqual(errorMessage);
    });

    it('getAll() should return all genres', () => {
      // Act
      const results = getAll(state);

      // Assert
      expect(results.length).toBe(3);
      expect(results).toStrictEqual([
        createGenre('PRODUCT-AAA'),
        createGenre('PRODUCT-BBB'),
        createGenre('PRODUCT-CCC'),
      ]);
    });

    it('getAllAsDictionary() should return all genres as a dictionary', () => {
      // Act
      const results = getAllAsDictionary(state);

      // Assert
      expect(Object.keys(results).length).toBe(3);
      expect(results['PRODUCT-AAA']).not.toBeNull();
      expect(results['PRODUCT-BBB']).not.toBeNull();
      expect(results['PRODUCT-CCC']).not.toBeNull();
    });

    it('getSelectedId() should return the selected ID', () => {
      // Act
      const selectedId = getSelectedId(state);

      // Assert
      expect(selectedId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return genre matching selected ID', () => {
      // Act
      const selected = getSelected(state);

      // Assert
      expect(selected).toStrictEqual(createGenre('PRODUCT-BBB'));
    });
  });
});
