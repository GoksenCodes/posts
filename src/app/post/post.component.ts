import { Component, OnInit, Input } from '@angular/core';
import { IPost } from '../posts-container/posts-container.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  showUserId: boolean = false;

  @Input() post?: IPost;

  constructor() { }

  ngOnInit(): void {
  }

  toggleId() {
    this.showUserId = !this.showUserId;
  }
}
