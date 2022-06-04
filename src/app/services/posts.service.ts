import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPost } from '../posts-container/posts-container.component';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts$ = new BehaviorSubject<IPost[]>([])

  constructor(
    private apiService: ApiService
  ) { }

  public init(): void {
    this.apiService.getPosts()
      .subscribe((posts) => {
        this.posts$.next(posts)
      })
  }

  public getPosts(): Observable<IPost[]> {
    return this.posts$
  }

  public getFilteredPostsByUserId(userId: number): Observable<IPost[]> {
    return this.posts$.pipe(
      map((posts) => posts.filter((post) => post.userId === userId))
    )
  }

  public getUniqueUserIds(): Observable<number[]> {
    return this.posts$.pipe(
      map((posts) => {
        const userIds = posts.map(post => post.userId)
        return [...new Set(userIds)]
      })
    )
  }
}
