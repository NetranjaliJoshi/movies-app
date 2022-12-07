import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { TvshowsService } from 'src/app/services/tvshows.service';
import { Genre } from '../../models/genres';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  genres: Genre[] = [];
  tvShowGenres: Genre[] = [];
  constructor(private moviesService: MoviesService, private tvShowsService: TvshowsService) {}

  ngOnInit(): void {
    this.getMovieGenre();
    this.TVGenres();
  }

  getMovieGenre() {
    this.moviesService.getMoviesGenres().subscribe((genreData) => {
      this.genres = genreData;
      console.log('from genre component');
    });
  }

  TVGenres() {
    this.tvShowsService.getTvShowsGenres().subscribe((genresData) => {
      this.tvShowGenres = genresData;
    });
  }
}
