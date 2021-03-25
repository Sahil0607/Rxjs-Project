import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { CreateObservableService } from '../utils/create-observable.service';

@Component({
  selector: 'app-rxjs-observable',
  templateUrl: './rxjs-observable.component.html',
  styleUrls: ['./rxjs-observable.component.css']
})
export class RxjsObservableComponent implements OnInit {

  constructor(private createObservableService: CreateObservableService) { }

  ngOnInit(): void {
    // this.rxjsObservable();
    // this.rxjsUnsubscribe();
  }

  rxjsObservable() {
    this.createObservableService.createFatchObservable('https://jsonplaceholder.typicode.com/posts')
    .subscribe(
      course => console.log(course),
      err => console.log(err),  // write 'noop', if we will not expect error
      () => console.log('completed')
    );
  }

  rxjsUnsubscribe() {
    const firstVal$ = interval(1000);
    const second$ = interval(1000);

    const observable1 = firstVal$.subscribe(val => console.log('First: ', val));
    const observable2 = second$.subscribe(val => console.log('Second: ', val));

    setTimeout(() => {
      // UnSubscribe observable2 so it will not print value from 4.
      observable2.unsubscribe();
    }, 4000);
  }
}
