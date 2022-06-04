import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

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

  constructor(
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(async response => {
        const data = await response.json();
        this.posts = data;

        if ((data && data.message) || !response.ok) {
          // get error message from body or default to response status
          const error = response.status;
          return Promise.reject(error);
        }

        return this.posts;

      })
      .catch(error => {
        console.error(error)
        alert('Something went wrong, please refresh the page')
      })
  }
}
