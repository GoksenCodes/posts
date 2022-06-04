import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
import { ApiService } from './api.service';
import { mockPosts } from '../mock/mockPosts';
import { SecurityContext } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('PostsService', () => {
  let service: PostsService;
  const mockData = mockPosts

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService, HttpClient, HttpHandler]
    });
    service = TestBed.inject(PostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFilteredPostsByUserId', () => {
    it('should get posts', () => {
      service.posts$.next(mockData)

      service.getFilteredPostsByUserId(1)
        .subscribe(
          posts => {
            expect(posts.length).toBe(2);
          }
        )
    })
  })

  describe('getUniqueUserIds', () => {
    it('should get posts', () => {

      service.posts$.next(mockData)

      service.getUniqueUserIds().subscribe(
        uniqueIds => {
          expect(uniqueIds).toEqual([1, 2, 3]);
        }
      )
    })
  })
});
