import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateObservableService {

  constructor(private http: HttpClient) { }

  createFatchObservable(url: string) {
    // Promise will immidialtly executed once we deifne it.
    // Observable will executed when we subscribe it.
    
    //Create custom observable from scratch
    // All the built in observable are created like this. Ex: timer, interval
    return new Observable(subscriber => {  // Output of http$ will observable
      fetch(url)    // 'https://jsonplaceholder.typicode.com/posts'
      .then(response => response.json())
      .then(data => {
        // subscriber.next(1);    // Observable give us first value 1 
        // subscriber.next(2);     // Observable give us second value 2

        subscriber.next(data);  // Send data to subscriber
        // subscriber.complete();  // Terminated stream
        // Cannot do subscriber.next() after complete()
      })
      .catch((err) => {
        subscriber.error('Error coming from new observable');
      });
      // If we check network tab we can see no request made. Because we are not subscribing now.
    });
  }

  createObservable(url: string) {
    return this.http.get(url);
  }
}
