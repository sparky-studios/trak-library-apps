import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { Genre } from './genres.models';
import {
  getGenreAction,
  getGenreFailureAction,
  getGenreSuccessAction,
} from './genres.actions';

export const GENRES_FEATURE_KEY = 'genres';

export interface State extends EntityState<Genre> {
  selectedId: string | null;
  loading: boolean;
  saving: boolean;
  error?: string | null;
}

export interface GenresPartialState {
  readonly [GENRES_FEATURE_KEY]: State;
}

export const genresAdapter: EntityAdapter<Genre> = createEntityAdapter<Genre>();

export const initialState: State = genresAdapter.getInitialState({
  selectedId: null,
  loading: false,
  saving: false,
});

const genresReducer = createReducer(
  initialState,
  on(getGenreAction, (state) => ({
    ...state,
    loading: true,
  })),
  on(getGenreSuccessAction, (state, { genre }) =>
    genresAdapter.setOne(genre, { ...state, loaded: false })
  ),
  on(getGenreFailureAction, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return genresReducer(state, action);
}
