import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // singleton service
})
export class FlickrDataService {
  port = '3456';
  baseUrl = `http://localhost:${this.port}`;
  flickrApiBaseURL = 'https://api.flickr.com/services/feeds/photos_public.gne';
  constructor(private http: HttpClient) {}

  getImages(data) {
    return this.http.jsonp(`${this.flickrApiBaseURL}?tags=${data}&format=json&jsoncallback=JSONP_CALLBACK`, 'JSONP_CALLBACK');
  }
}
