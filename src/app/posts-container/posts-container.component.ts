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

  //promise then

  // getPosts() {
  //   fetch('https://jsonplaceholder.typicode.com/posts')
  //     .then(res => {
  //       return res.json();
  //     }).then(data => {
  //       if (data) {
  //         this.posts = data;
  //         this.filteredPosts = data;
  //         this.userIds = [... new Set(this.posts.map(post => post.userId))]
  //       }
  //     }).catch(error => {
  //       console.error(error);
  //       alert('Something went wrong, please refresh the page')
  //     })
  // }


  //async await with try catch

  // async getPosts() {
  //   try {
  //     const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  //     const data = await response.json();

  // if (data) {
  //   this.posts = data;
  //   this.filteredPosts = data;
  //   this.userIds = [... new Set(this.posts.map(post => post.userId))]
  // }

  // } catch (error) {
  //   console.error(error);
  //   alert('Something went wrong, please refresh the page')

  // }

  // }

  getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(async response => {
        const data = await response.json();
        this.posts = data;
        this.filteredPosts = data;
        this.userIds = [... new Set(this.posts.map(post => post.userId))]

        console.log("data", data)
        console.log("response", response)

        console.log('promise', Promise)

        if ((data && data.message) || !response.ok) {

          const error = response.status;
          console.log(error)
          return Promise.reject(error);
        }

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
      onlySelf: true
    });

    //event target value returns string

    //onlySelf: when true, each change only affects this control and not it's parent
    // bydefault it's false: for example when this formcontrol is not valid, angular would make ahole form not valid
    //by setting this as true, onlt this form control won't be valid.
    //but here, it helps to get userId as number

    const selectedUserId = this.userIdForm.value.userId;

    if (typeof selectedUserId === "number") {
      this.filterByUserId(selectedUserId);
    } else {
      this.filteredPosts = this.posts;
    }
  }
}
