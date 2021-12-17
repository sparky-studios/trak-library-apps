import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from '@sparky-studios/shared/data-access-genres';
import { HttpClient } from '@angular/common/http';

/**
 * Service that is used to perform server-side CRUD operations for {@link Genre} instances.
 *
 * @author Sparky Studios
 * @since 0.0.1
 */
@Injectable({
  providedIn: 'root',
})
export class GenreService {
  /**
   * Constructor used to inject the needed dependencies.
   *
   * @param http The {@link HttpClient} instance to inject.
   * @param domain The domain URL to inject.
   */
  constructor(
    private http: HttpClient,
    @Inject('domain') private domain: string
  ) {}

  /**
   * Calls off to the server to attempt to retrieve the {@link Genre} that matches
   * the given ID.
   *
   * @param id The ID of the {@link Genre} to retrieve.
   */
  findById(id: string): Observable<Genre> {
    return this.http.get<Genre>(`${this.domain}/games/genres/${id}`);
  }
}
