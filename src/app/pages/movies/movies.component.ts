import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Item } from 'src/app/components/movie-item/item';
import { MoviesService } from 'src/app/services/movies.service';
import { mapMovieToItem, Movie } from '../../models/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Item[] = [];
  genreId: string | null = null;
  searchValue: string | null = null;
  constructor(private moviesService: MoviesService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMoviesByGenre(genreId, 1);
      } else {
        this.getPagedMovies(1);
      }
    });
  }
  getPagedMovies(page: number, searchkey?: string) {
    this.moviesService.searchMovies(page, searchkey).subscribe((movie) => {
      this.movies = movie.map((movie) => mapMovieToItem(movie));
    });
  }

  paginate(event: any) {
    const pageNumber = event.page + 1;
    if (this.genreId) {
      this.getMoviesByGenre(this.genreId, pageNumber);
    } else {
      if (this.searchValue) {
        this.getPagedMovies(pageNumber, this.searchValue);
      } else {
        this.getPagedMovies(pageNumber);
      }
    }
  }

  getMoviesByGenre(genreId: string, page: number) {
    this.moviesService.getMoviesByGenresID(genreId, page).subscribe((movie) => {
      this.movies = movie.map((movie) => mapMovieToItem(movie));
    });
  }

  searchChanged() {
    if (this.searchValue) {
      this.getPagedMovies(1, this.searchValue);
    }
  }
}
