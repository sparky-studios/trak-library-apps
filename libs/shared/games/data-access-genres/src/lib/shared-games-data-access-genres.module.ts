import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromGenres from './+state/genres.reducer';
import { GenresEffects } from './+state/genres.effects';
import { GenresFacade } from './+state/genres.facade';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(fromGenres.GENRES_FEATURE_KEY, fromGenres.reducer),
    EffectsModule.forFeature([GenresEffects]),
  ],
  providers: [GenresFacade],
})
export class SharedGamesDataAccessGenresModule {}
