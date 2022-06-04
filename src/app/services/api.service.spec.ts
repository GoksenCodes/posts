import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ApiService } from './api.service';
import { IPost } from '../posts-container/posts-container.component';

describe('ApiService', () => {
  let httpTestingController: HttpTestingController;
  let service: ApiService;


  const mockData: IPost[] = [
    {
      userId: 1,
      id: 2,
      title: "",
      body: "quia et suscipit\nsuscipi..."
    },
    {
      userId: 2,
      id: 6,
      title: "",
      body: "quia et suscipit\nsuscipi..."
    },
    {
      userId: 3,
      id: 4,
      title: "",
      body: "quia et suscipit\nsuscipi..."
    }
  ]


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

  // it('#getPosts should return expected data', (done) => {
  //   const expectedData: IPost[] = [
  //     {
  //       "userId": 1,
  //       "id": 1,
  //       "title": "",
  //       "body": "quia et suscipit\nsuscipi..."
  //     },
  //     {
  //       "userId": 2,
  //       "id": 1,
  //       "title": "",
  //       "body": "quia et suscipit\nsuscipi..."
  //     },
  //     {
  //       "userId": 3,
  //       "id": 1,
  //       "title": "",
  //       "body": "quia et suscipit\nsuscipi..."
  //     },
  //   ];

  //   service.getPosts().subscribe(data => {
  //     expect(data).toEqual(expectedData);
  //     done();
  //   });

  //   const testRequest = httpTestingController.expectOne({
  //     method: 'GET',
  //     url: 'https://jsonplaceholder.typicode.com/posts'
  //   });

  //   testRequest.flush(expectedData);
  // });

  // it('#getData should return an empty object on error', (done) => {
  //   const expectedData: IPost[] = []

  //   service.getPosts().subscribe(data => {
  //     expect(data).toEqual(expectedData);
  //     done();
  //   });

  //   const testRequest = httpTestingController.expectOne({
  //     method: 'GET',
  //     url: "https://jsonplaceholder.typicode.com/post"
  //   });

  //   testRequest.flush('error', { status: 500, statusText: 'Broken Service' });
  // });

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
      // Receive GET request
      const req = httpTestingController.expectOne(service.url);
      expect(req.request.method).toEqual('GET');
      // Respond with the mock posts
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
