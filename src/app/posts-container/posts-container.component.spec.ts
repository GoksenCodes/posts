import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { ApiService } from '../services/api.service';

import { PostsContainerComponent } from './posts-container.component';
import { FormBuilder } from '@angular/forms';
import { mockPosts } from '../mock/mockPosts';

describe('PostsContainerComponent', () => {
  let component: PostsContainerComponent;
  let fixture: ComponentFixture<PostsContainerComponent>;

  const mockData = mockPosts

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsContainerComponent],
      providers: [ApiService, HttpClient, HttpHandler, FormBuilder]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
