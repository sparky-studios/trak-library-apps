import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getAll, getLoading, getSaving, getSelected } from './genres.selectors';
import { getGenreAction } from './genres.actions';

/**
 * The {@link GenresFacade} is a simple class that acts as a face to interact with
 * the genre state without having to directly import or change store outside the scope
 * of this module.
 *
 * @author Sparky Studios
 * @since 0.0.1
 */
@Injectable()
export class GenresFacade {
  /**
   * An observable emitting the current loading state.
   */
  loading$ = this.store.pipe(select(getLoading));

  /**
   * An observable emitting the current saving state.
   */
  saving$ = this.store.pipe(select(getSaving));

  /**
   * An observable emitting all the loaded {@link Genre} instances.
   */
  all$ = this.store.pipe(select(getAll));

  /**
   * An observable emitting the currently selected {@link Genre} instance.
   */
  selected$ = this.store.pipe(select(getSelected));

  /**
   * Constructor used to inject the needed dependencies.
   *
   * @param store The {@link Store} instance to inject.
   */
  constructor(private readonly store: Store) {}

  /**
   * Simple wrapper method that will dispatch the {@link getGenreAction} to the
   * genre state and attempt to load the {@link Genre} entity from the server
   * which matches the given ID. Upon successful loading, the {@link Genre} entity
   * will be added to the state.
   *
   * @param id The ID of the {@link Genre} to load.
   */
  getGenre(id: string): void {
    this.store.dispatch(getGenreAction({ id }));
  }
}
