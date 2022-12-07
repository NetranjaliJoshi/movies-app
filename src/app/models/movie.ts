import { Item } from '../components/movie-item/item';

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  revenue: number;
  runtime: number;
  status: string;
  genres: Genres[];
}

export interface MovieDto {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export interface Genres {
  id: number;
  name: string;
}

export interface MovieVideoDto {
  id: number;
  results: MovieVideo[];
}

export interface MovieVideo {
  site: string;
  key: string;
}

export interface MovieImage {
  backdrops: {
    file_path: string;
  }[];
}

export interface MovieCredits {
  cast: {
    name: string;
    profile_path: string;
  }[];
}
export const mapMovieToItem = (movie: Movie): Item => {
  return {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
    backdrop_path: movie.backdrop_path,
    vote_count: movie.vote_count,
    release_date: movie.release_date,
    overview: movie.overview,
    routePath: '/movie-detail/' + movie.id
  };
};
