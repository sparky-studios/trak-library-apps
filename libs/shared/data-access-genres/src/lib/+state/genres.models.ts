/**
 * Represents the response from the {@link GenreService} when a successful
 * request has been made and {@link Genre} details have been found matching
 * the given details. Each {@link Genre} represents a single instance.
 *
 * @author Sparky Studios
 * @since 0.0.1
 */
export interface Genre {
  id: string;
  name: string;
  description: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}
