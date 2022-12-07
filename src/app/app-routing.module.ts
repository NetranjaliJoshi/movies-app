import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenresComponent } from './pages/genres/genres.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { TvShowsDetailComponent } from './pages/tv-shows-detail/tv-shows-detail.component';
import { TvShowsComponent } from './pages/tv-shows/tv-shows.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'movies',
    component: MoviesComponent
  },
  {
    path: 'movies/genres/:genreId',
    component: MoviesComponent
  },
  {
    path: 'genres',
    component: GenresComponent
  },
  {
    path: 'movie-detail/:id',
    component: MovieDetailComponent
  },
  {
    path: 'tvshows',
    component: TvShowsComponent
  },
  {
    path: 'tvshow/:id',
    component: TvShowsDetailComponent
  },
  {
    path: 'tvshows/genres/:genreId',
    component: TvShowsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
