import { Injectable } from '@angular/core';
import { IPost } from '../posts-container/posts-container.component';
import { Observable, EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(
    private http: HttpClient
  ) { }

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.url).pipe(
      catchError(this.handleError<IPost[]>([]))
    );
  }

  handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      alert('Something went wrong, please try again later')

      return EMPTY;
    }
  }
}
