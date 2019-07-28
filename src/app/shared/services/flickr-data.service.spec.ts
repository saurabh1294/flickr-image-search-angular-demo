import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { of, Observable } from 'rxjs';
import { FlickrDataService } from './flickr-data.service';
import { HttpClient } from '@angular/common/http';
import { HttpBackend, JsonpClientBackend, HttpClientJsonpModule } from '@angular/common/http';

const ObserverThrowServiceStub = {
  error: { error: 'some-error' },
  getImages(query = 'Australia') {
    return Observable.create(observer => {
      if (this.error) {
        observer.error(new Error());
      } else {
        observer.next({ data: 'test-data' });
      }
      observer.complete();
    });
  }
};

describe('FlickrDataService', () => {
  const successHandler: jasmine.Spy = jasmine.createSpy('getImages');
  const errorHandler: jasmine.Spy = jasmine.createSpy('getImages');
  let flickrDataService: FlickrDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FlickrDataService,
        {
          provide: JsonpClientBackend,
          useExisting: HttpBackend,
          useValue: { flickrDataService, getImages: ObserverThrowServiceStub }
        }
      ]
    });

    flickrDataService = TestBed.get(FlickrDataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(inject([HttpTestingController, FlickrDataService], (backend: HttpTestingController) => {
    backend.verify();
  }));

  describe('getImages()', () => {
    it('should fetch images from flickr feed', inject(
      [FlickrDataService, HttpTestingController, HttpClient],
      (backend: HttpTestingController, http: HttpClient, httpClient: HttpClient, httpJsonpModule: HttpClientJsonpModule) => {
        successHandler.and.returnValue(Promise.resolve({ data: 'test-data' }));
        successHandler.and.callThrough();
        successHandler.and.returnValue(of({ data: 'test-data' }));
      }
    ));
  });
});
