import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';

const HTTP_PARAMATERS = new HttpParams({
  fromObject: {
    action: "opensearch",
    format: "json",
    origin: "*"
  }
});

@Injectable()
export class MovieDBAPI {

  constructor(private http: HttpClient) { }
  // embedded API key, change to a different one if need be
  apiKey = '487dddb9'
  movieInfo = []

  getMovie(movie: string) {
    if (movie === '') {
      return of([]);
    }
    
    return this.http.get('http://www.omdbapi.com/?s=' + movie + '&apikey=' + this.apiKey, 
    { params: HTTP_PARAMATERS.set('search', movie) });
  }

  getMovieInfo(movie: any){
    this.http.get('http://www.omdbapi.com/?i=' + movie.imdbID + '&apikey=' + this.apiKey, 
    { params: HTTP_PARAMATERS.set('search', movie.imdbID) })
    .subscribe(data=> {
      return data;
    })
  }


  getMovieByTitle(movieTitle: string) {
    this.http.get('http://www.omdbapi.com/?t=' + movieTitle + '&apikey=' + this.apiKey)
    .subscribe(data=> {
      return data;
    })
  }

}