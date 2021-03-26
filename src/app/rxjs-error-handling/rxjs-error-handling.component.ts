import { Component, OnInit } from '@angular/core';
import { from, of, timer } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-error-handling',
  templateUrl: './rxjs-error-handling.component.html',
  styleUrls: ['./rxjs-error-handling.component.css']
})
export class RxjsErrorHandlingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.rxjsCatchError();
    this.catchingErrorPromise();
  }

  rxjsCatchError() {
    const catchErr = of('I', 'II', 'III', 'IV', 'V').pipe(
      map(num => {
        if (num == 'V') {
          throw 'Number ' + num + ' Not allowed';
        }
        return num;
      }),
      catchError(err => {
        // We can execute whaterve we want here
        // return of(1,2,3,4, 'This numbers are only allowed this is for testing');
        throw 'error in source. Details: ' + err;
      })
    );

    catchErr.subscribe(console.log);
  }

  catchingErrorPromise() {
    const myPromise = () => new Promise((resolve, reject) => reject('Rejected by myPromise'));
    const source = timer(2000);
    const example = source.pipe(
      mergeMap(val =>   // Merge promise error in to catchError
        from(myPromise()).pipe(  // from() is used to call function observale
          catchError(err => {
            return of(`Error from promise is ${err}`);  // Show in regular text
            // throw `Error from promise is ${err}`;  // Show in red line in console
          }
          ))
      )
    );
    example.subscribe(console.log);
    // We can see error after 2 second
  }
}
