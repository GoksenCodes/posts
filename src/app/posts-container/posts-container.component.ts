import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PostsService } from '../services/posts.service';

export interface IPost {
  id: number;
  title: string,
  body: string,
  userId: number
}

@Component({
  selector: 'app-posts-container',
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.scss']
})

export class PostsContainerComponent implements OnInit {

  public posts$!: Observable<IPost[]>;
  public filteredPosts$!: Observable<IPost[]>;
  public userIds$!: Observable<number[]>;

  userIdForm: FormGroup = this.fb.group({
    userId: [null, Validators.required]
  });

  constructor(
    public postsService: PostsService,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.posts$ = this.postsService.getPosts();
    this.filteredPosts$ = this.postsService.getPosts();
    this.userIds$ = this.postsService.getUniqueUserIds();

    this.postsService.init();
  }

  filterByUserId(userId: number) {
    this.filteredPosts$ = this.postsService.getFilteredPostsByUserId(userId)
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
      this.filteredPosts$ = this.posts$;
    }
  }
}
