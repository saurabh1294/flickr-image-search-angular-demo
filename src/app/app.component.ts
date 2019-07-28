import { Component, OnInit } from '@angular/core';
import { FlickrDataService } from './shared/services/flickr-data.service';

/** @title Datepicker emulating a Year and month picker */
@Component({
  selector: 'app-root app-flickr-image-search-engine',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class FlickrImageGalleryComponent implements OnInit {
  imageQuery: any;
  images: boolean;
  items: any[];
  errors: any;

  constructor(private flickrDataService: FlickrDataService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.imageQuery = 'Australia'; // default search query for flickr API
    this.search();
  }

  search() {
    console.log('inside search()', this);
    this.flickrDataService.getImages(this.imageQuery).subscribe(response => {
      console.log(response, 'this is the response');
      const result: any = response;
      console.log(result);
      this.images = true;
      this.items = result.items;
    },
    error => {
      this.errors = error;
      // error condition
      console.log('Error occured in fetching images', error);
      alert('Error occured '+ JSON.stringify(error, null, 4));
    }
    );
  }
}
