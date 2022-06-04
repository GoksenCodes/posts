import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { mockPosts } from '../mock/mockPosts';

describe('ApiService', () => {
  let httpTestingController: HttpTestingController;
  let service: ApiService;

  const mockData = mockPosts;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPosts', () => {
    it('should return mock posts', () => {
      spyOn(service, 'handleError').and.callThrough();

      service.getPosts().subscribe(
        posts => expect(posts.length).toEqual(mockData.length),
        fail
      );

      const req = httpTestingController.expectOne(service.url);
      expect(req.request.method).toEqual('GET');

      req.flush(mockData);
    });

    it('should handle error', () => {
      spyOn(service, 'handleError').and.callThrough();

      service.getPosts().subscribe(
        posts => expect(posts).toEqual([]),
        fail
      );

      const req = httpTestingController.expectOne(service.url);
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect(service.handleError).toHaveBeenCalledTimes(1);
    });
  });
});
