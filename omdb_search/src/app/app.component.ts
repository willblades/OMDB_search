import { Component , ViewChild, ElementRef, OnInit} from '@angular/core';
import { debounceTime, map, distinctUntilChanged, filter} from "rxjs/operators";
import { fromEvent } from 'rxjs';
import { MovieDBAPI } from './omdb-api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  @ViewChild('searchText', { static: true })
  title : String;
  searchText!: ElementRef;
  minSearchLength: any;
  apiResponse: any;
  searchFlag: boolean;

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = 'orange';
}

  constructor(
    private elementRef: ElementRef,
    private movieService: MovieDBAPI
  ) {
    this.title = "omdb_search"
    this.minSearchLength = 3;
    this.searchFlag = false;
    this.apiResponse = [];
    console.log(this.searchText);
  }

  ngOnInit() {

    console.log(this.searchText);

    fromEvent(this.searchText.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      , filter(result => result.length > this.minSearchLength)
      , debounceTime(500) 
      , distinctUntilChanged()
    ).subscribe((searchString: string) => {

      this.searchFlag = true;
      this.movieService.getMovie(searchString).subscribe((response) => {
        console.log('res', response);
        this.searchFlag = false;
        this.apiResponse = response;
      }, (error) => {
        this.searchFlag = false;
        console.log('error', error);
      });
    });
  }
    
    queryMovieInfo(movie:any) {
      return this.movieService.getMovieInfo(movie)
  }
}

