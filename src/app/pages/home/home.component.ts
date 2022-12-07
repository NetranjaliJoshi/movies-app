import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/components/movie-item/item';
import { mapTvShowToItem } from '../../models/tv';
import { TvshowsService } from 'src/app/services/tvshows.service';
import { mapMovieToItem, Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularMovies: Item[] = [];
  upcomingMovies: Item[] = [];
  topratedMovies: Item[] = [];
  popularTvShows: Item[] = [];

  constructor(private moviesServices: MoviesService, private tvshowsService: TvshowsService) {}

  ngOnInit(): void {
    this._getPopularMovies();
    this._getUpcomingMovies();
    this._getTopRatedMovies();
    this._getTVShows();
  }

  private _getPopularMovies() {
    this.moviesServices.getMovies('popular').subscribe((movie) => {
      this.popularMovies = movie.map((movie) => mapMovieToItem(movie));
    });
  }

  private _getUpcomingMovies() {
    this.moviesServices.getMovies('upcoming').subscribe((movie) => {
      this.upcomingMovies = movie.map((movie) => mapMovieToItem(movie));
    });
  }

  private _getTopRatedMovies() {
    this.moviesServices.getMovies('top_rated').subscribe((movie) => {
      this.topratedMovies = movie.map((movie) => mapMovieToItem(movie));
    });
  }

  private _getTVShows() {
    this.tvshowsService.getTvs('popular').subscribe((tvshows) => {
      this.popularTvShows = tvshows.map((tvshow) => mapTvShowToItem(tvshow));
    });
  }
}
