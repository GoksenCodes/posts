import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, EMPTY } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http/http';

export interface IPost {
  id: number;
  title: 'foo',
  body: 'bar',
  userId: 1
}

@Component({
  selector: 'app-posts-container',
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.scss']
})

export class PostsContainerComponent implements OnInit {

  posts: IPost[] = [];
  filteredPosts: IPost[] = [];
  userIds: number[] = [];
  userIdForm: FormGroup = this.fb.group({
    userId: [null, Validators.required]
  });

  destroy$ = new Subject();


  constructor(
    public apiService: ApiService,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.getPostsFromService();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  getPostsFromService() {
    this.apiService.getPosts().pipe(
      takeUntil(this.destroy$))
      .subscribe((posts: IPost[]) => {
        this.posts = posts;
        this.filteredPosts = posts;
        this.userIds = [... new Set(this.posts.map(post => post.userId))]
      })
  }

  filterByUserId(userId: number) {
    this.filteredPosts = this.posts.filter(post => post.userId === userId)
  }

  get userId() {
    return this.userIdForm.get('userId')
  }

  updatePostsView(e: any) {
    this.userId!.setValue(e.target.value, {
      onlySelf: true,
    });

    const selectedUserId = this.userIdForm.value.userId;

    if (typeof selectedUserId === "number") {
      this.filterByUserId(selectedUserId);
    } else {
      this.filteredPosts = this.posts;
    }
  }
}
