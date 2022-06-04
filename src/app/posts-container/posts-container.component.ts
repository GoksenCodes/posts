import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface IPost {
  id: number;
  title: string,
  body: string,
  userId: number;
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


  constructor(
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(async response => {
        const data = await response.json();
        this.posts = data;
        this.filteredPosts = data;
        this.userIds = [... new Set(this.posts.map(post => post.userId))]

        if ((data && data.message) || !response.ok) {
          // get error message from body or default to response status
          const error = response.status;
          return Promise.reject(error);
        }

        console.log(this.userIds)

        return this.posts;

      })
      .catch(error => {
        console.error(error)
        alert('Something went wrong, please refresh the page')
      })
  }

  filterByUserId(userId: number) {
    this.filteredPosts = this.posts.filter(post => post.userId === userId)
  }

  get userId() {
    return this.userIdForm.get('userId')
  }

  updatePostsView(e: any) {
    this.userId ?.setValue(e.target.value, {
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
