import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMAGES_SIZES } from '../../constants/images-sizes';
import { Movie, MovieCredits, MovieImage, MovieVideo } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { first } from 'rxjs';

@Component({
  selector: 'movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | null = null;
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImage | null = null;
  movieCredits: MovieCredits | null = null;
  similarMovies: Movie[] = [];
  imagesizes = IMAGES_SIZES;
  // totalTimeInMinutes = this.movie?.runtime;

  // hour = Math.floor(this.totalTimeInMinutes / 60); //1h
  // minutes = this.totalTimeInMinutes - this.hour * 60; //30m
  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({ id }) => {
      this.getMovie(id);
      this.getMovieVideos(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
      this.getMovieSimilar(id);
    });
  }

  getMovie(id: string) {
    this.moviesService.getMovieDetail(id).subscribe((movieData) => {
      this.movie = movieData;
      console.log(this.movie);
    });
  }

  getMovieVideos(id: string) {
    this.moviesService.getMoviesVideos(id).subscribe((movieVideosData) => {
      this.movieVideos = movieVideosData;
      console.log(this.movieVideos);
    });
  }

  getMovieImages(id: string) {
    this.moviesService.getMovieImages(id).subscribe((movieImageData) => {
      this.movieImages = movieImageData;
    });
  }

  getMovieCredits(id: string) {
    this.moviesService.getMovieCredits(id).subscribe((movieData) => {
      this.movieCredits = movieData;
    });
  }

  getMovieSimilar(id: string) {
    this.moviesService.getMovieSimilar(id).subscribe((movieSimilarData) => {
      this.similarMovies = movieSimilarData;
    });
  }
}
