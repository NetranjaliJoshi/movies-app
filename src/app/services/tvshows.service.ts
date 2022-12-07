import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { GenresDto } from '../models/genres';
import { TvShow, TvShowCredits, TvShowDto, TvShowImages, TvShowVideoDto } from '../models/tv';

@Injectable({
  providedIn: 'root'
})
export class TvshowsService {
  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = '47f9688d600d23a3b04afa197b29ea01';

  constructor(private http: HttpClient) {}

  getTvShows(type: string = 'upcoming', count: number = 12) {
    return this.http.get<TvShowDto>(`${this.baseUrl}/tv/${type}?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }

  getTvShow(id: string) {
    return this.http.get<TvShow>(`${this.baseUrl}/tv/${id}?api_key=${this.apiKey}`);
  }

  getTvShowVideos(id: string) {
    return this.http.get<TvShowVideoDto>(`${this.baseUrl}/tv/${id}/videos?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }

  getTvShowsGenres() {
    return this.http.get<GenresDto>(`${this.baseUrl}/genre/tv/list?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.genres);
      })
    );
  }

  getTvShowsByGenre(genreId: string, pageNumber: number) {
    return this.http
      .get<TvShowDto>(`${this.baseUrl}/discover/tv?with_genres=${genreId}&page=${pageNumber}&api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getTvShowImages(id: string) {
    return this.http.get<TvShowImages>(`${this.baseUrl}/tv/${id}/images?api_key=${this.apiKey}`);
  }

  getTvShowCredits(id: string) {
    return this.http.get<TvShowCredits>(`${this.baseUrl}/tv/${id}/credits?api_key=${this.apiKey}`);
  }

  getTvShowSimilar(id: string) {
    return this.http.get<TvShowDto>(`${this.baseUrl}/tv/${id}/similar?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, 12));
      })
    );
  }

  searchTvShows(page: number, searchValue?: string) {
    const uri = searchValue ? '/search/tv' : '/tv/popular';
    return this.http
      .get<TvShowDto>(`${this.baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getTvs(type: string = 'latest', count: number = 12) {
    return this.http.get<TvShowDto>(`${this.baseUrl}/tv/${type}?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }
}
