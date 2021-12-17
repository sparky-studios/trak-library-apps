import { createAction, props } from '@ngrx/store';
import { Genre } from './genres.models';

/**
 * Enum that represents the different genre action types as defined types,
 * instead of loosely defined {@link string} values.
 *
 * @enum {string}
 */
export enum GenresActions {
  /**
   * The {@link GenresActions} type used to represent the {@link getGenreAction} action.
   */
  GetGenre = '[Genres] Get Genre',

  /**
   * The {@link GenresActions} type used to represent the {@link getGenreSuccessAction} action.
   */
  GetGenreSuccess = '[Genres] Get Genre - Success',

  /**
   * The {@link GenresActions} type used to represent the {@link getGenreFailureAction} action.
   */
  GetGenreFailure = '[Genres] Get Genre - Failure',
}

/**
 * An action that is triggered when the user requests additional details about a singular
 * {@link Genre} instance that matches the given property id.
 */
export const getGenreAction = createAction(
  GenresActions.GetGenre,
  props<{ id: string }>()
);

/**
 * A success action that is triggered when the {@link getGenreAction} action is successful.
 * It will pass the loaded {@link Genre} on as a property so that the data can be set within
 * the state.
 */
export const getGenreSuccessAction = createAction(
  GenresActions.GetGenreSuccess,
  props<{ genre: Genre }>()
);

/**
 * A failure action that is triggered when the {@link getGenreAction} action is unsuccessful.
 * An unsuccessful {@link getGenreAction} is only returned when either the server has provided
 * an error or incorrect information was provided. It will contain error details to populate the
 * state with when dispatched.
 */
export const getGenreFailureAction = createAction(
  GenresActions.GetGenreFailure,
  props<{ error: any }>()
);
