import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule, HttpClientJsonpModule, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { FlickrDataService } from './shared/services/flickr-data.service';

import { FlickrImageGalleryComponent } from './app.component';

describe('FlickrImageGalleryComponent', () => {
  let component: FlickrImageGalleryComponent;
  let fixture: ComponentFixture<FlickrImageGalleryComponent>;

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FlickrDataService,
          useClass: FlickrDataService,
          useValue: { getImages: ObserverThrowServiceStub }
        },
        { provide: HttpClient, useClass: HttpClient },
        { provide: HttpClientModule, useClass: HttpClientModule },
        { provide: HttpClientJsonpModule, useClass: HttpClientJsonpModule },
        { provide: HttpHandler, useClass: HttpHandler }
      ],
      declarations: [FlickrImageGalleryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlickrImageGalleryComponent);
    component = fixture.componentInstance;
    component.imageQuery = 'Australia';
    spyOn(FlickrDataService.prototype, 'getImages').and.callFake(() => {
      return of({ data: 'test-data' });
    });
    fixture.detectChanges();
  });

  describe('component', () => {
    it('should call search() and return images matching a tag on flickr', async done => {
      jasmine.createSpy('getImages').and.callThrough();
      console.log(component['flickrDataService'], 'flickrDataService');
      await jasmine.createSpy('getImages').and.returnValue(of({ data: 'test-data' }));
      done();
    });
  });

  describe('view', () => {
    it('check title and search button text when the app is launched', () => {
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('label').textContent).toContain('Search');
    });
  });
});
