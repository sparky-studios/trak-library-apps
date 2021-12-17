import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GENRES_FEATURE_KEY, State, genresAdapter } from './genres.reducer';

/**
 * Feature selector that retrieves the {@link State} genre sub-state.
 */
export const getGenresState = createFeatureSelector<State>(GENRES_FEATURE_KEY);

const { selectAll, selectEntities } = genresAdapter.getSelectors();

/**
 * Selector that is used to retrieve the current loading state of the {@link State}.
 */
export const getLoading = createSelector(
  getGenresState,
  (state: State) => state.loading
);

/**
 * Selector that is used to retrieve the current saving state of the {@link State}.
 */
export const getSaving = createSelector(
  getGenresState,
  (state: State) => state.saving
);

/**
 * Selector that is used to retrieve the current error message state of the {@link State}.
 */
export const getError = createSelector(
  getGenresState,
  (state: State) => state.error
);

/**
 * Selector that is used to retrieve the current loading state of the {@link State}.
 */
export const getAll = createSelector(getGenresState, (state: State) =>
  selectAll(state)
);

/**
 * Selector that is used to retrieve the current loading state of the {@link State}
 * as a dictionary.
 */
export const getAllAsDictionary = createSelector(
  getGenresState,
  (state: State) => selectEntities(state)
);

/**
 * Selector that is used to retrieve the ID of the currently selected {@link Genre}
 * from the {@link State}.
 */
export const getSelectedId = createSelector(
  getGenresState,
  (state: State) => state.selectedId
);

/**
 * Selector that is used to the currently selected {@link Genre} entity from the {@link State}.
 */
export const getSelected = createSelector(
  getAllAsDictionary,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
