import { Injectable } from '@angular/core';
import { IPost } from '../posts-container/posts-container.component';
import { Observable, throwError, EMPTY } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>('https://jsonplaceholder.typicode.com/post').pipe(
      catchError(this.handleError<IPost[]>([]))
    );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      alert('Something went wrong, please try again later')

      return EMPTY;
    }
  }
}
