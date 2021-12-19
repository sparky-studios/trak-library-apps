import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getGenreAction,
  getGenreFailureAction,
  getGenreSuccessAction,
} from './genres.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { GenreService } from '../service/genre.service';
import { of } from 'rxjs';

/**
 * The {@link GenresEffects} is a class that contains a collection of NGRX effect observables
 * that are related to CRUD operations with {@link Genre} instances.
 *
 * @author Sparky Studios
 * @since 0.0.1
 */
@Injectable()
export class GenresEffects {
  /**
   * Constructor used to inject the needed dependencies.
   *
   * @param actions$ The
   * @param genreService
   */
  constructor(
    private readonly actions$: Actions,
    private genreService: GenreService
  ) {}

  /**
   * Effect that is triggered when the {@link getGenreAction} action is dispatched within the store.
   * When dispatched, it will call off to the {@link GenreService} and attempt to retrieve the {@link Genre}
   * that matches the given ID from the {@link getGenreAction}.
   *
   * If the action is successful and the API returns a valid response and {@link Genre} instance, a
   * {@link getGenreSuccessAction} action is dispatched and the {@link Genre} added to the state. If the
   * action is unsuccessful, a {@link getGenreFailureAction} action is dispatched containing error
   * details to populate the state with.
   */
  getGenre$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getGenreAction),
      switchMap((action) =>
        this.genreService.findById(action.id).pipe(
          map((genre) => getGenreSuccessAction({ genre })),
          catchError(() =>
            of(getGenreFailureAction({ error: 'Failed to load genre' }))
          )
        )
      )
    )
  );
}
