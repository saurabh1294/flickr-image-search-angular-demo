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
      // providers: [
      //   {
      //     provide: FlickrDataService,
      //     useClass: FlickrDataService,
      //     useValue: { flickrDataService, getImages: ObserverThrowServiceStub }
      //   }
      // ]
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
        // const flickrObservable = of(null);
        // flickrDataService = new FlickrDataService(http);
        // flickrDataService.getImages("Australia").subscribe(res=>console.log(res));
        // const req = backend.expectOne(`https://api.flickr.com/services/feeds/photos_public.gne?
        // &tags=Australia&format=json&jsoncallback=JSONP_CALLBACK`, 'JSONP_CALLBACK');
        // expect(req.request.body).toEqual({})
        // req.flush({data: 'test-data'})
        // let result: any;
        // flickrDataService.getImages("Australia").subscribe(data => (result = data), fail);
        // backend.expectNone('https://api.flickr.com/services/feeds/photos_public.gne');
        // expect(result).toBe(null);
        // successHandler.and.callThrough();
        // successHandler.and.returnValue(of({ data: 'test-data' }));

        const dummyData = { data: 'test-data' };

        // flickrDataService.getImages("Australia").subscribe(data => {
        //   expect(data).toEqual(dummyData);
        // });

        // backend.expectNone(
        //   req => req.method === 'GET' && req.url === 'https://api.flickr.com/services/feeds/photos_public.gne'
        // );
        // expect(result).toBe(null);

        successHandler.and.returnValue(Promise.resolve({ data: 'test-data' }));
        // jasmine.createSpy('getImages').and.callThrough();
        // flickrDataService.getImages('Australia').subscribe((response: any) => {
        //   expect(response.key).toBe('value');
        // });
        // wait until all Promises are resolved
        // tick();
        successHandler.and.callThrough();
        successHandler.and.returnValue(of({ data: 'test-data' }));
        //   const req = httpMock.expectNone(request => request.url === `
        // https://api.flickr.com/services/feeds/photos_public.gne?
        //   &tags=Australia&format=json&jsoncallback=JSONP_CALLBACK
        // `);
        // expect(req.request.method).toBe('JSONP');
        // req.flush(dummyData);
      }
    ));
  });
});
