import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, interval, Observable, of, from, timer } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, mergeMap, startWith, switchMap, tap, throttle, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-switchmap',
  templateUrl: './rxjs-switchmap.component.html',
  styleUrls: ['./rxjs-switchmap.component.css']
})
export class RxjsSwitchmapComponent implements OnInit, AfterViewInit {
  switchMapVal: number = 0;
  debounceTimeValue: string = '';
  @ViewChild('debounceTime') inputValue: ElementRef;

  constructor() { }

  ngOnInit(): void {
    // this.rxjsSwitchMap();
    // this.rxjsOf();
    // this.rxjsTapOperator();
    // this.rxjsDistinctUntilChanged();
    this.rxjsFrom();
  }

  rxjsSwitchMap() {
    // Switchmap will remove older observable stream when it get new stream.
    // Basically used in search input. When we type something it will remove older serach and replace with new one.
    // Remove older subscriptiona and use new observable.

    const button = document.getElementById('clickMe');
    const obs1 = fromEvent(button, 'click');
    const obs2 = interval(1000);

    obs1.pipe(switchMap(x => obs2))
    .subscribe(val => this.switchMapVal = val);

    // when we click again it will cancle old obs. and start new value from 0
    // Best use for typing to cancle old sub. and trigger new one
  }

  ngAfterViewInit() {
    // Use either one of them operation to achive search opration.
    // this.rxjsDebouncetime();
    this.rxjsThrottling();
  }

  rxjsDebouncetime() {
    // debounceTime is best use in search keyup event
    // It will wait for some time to user type. It will not send req. on every keyup method
    // For ex: 'helloWorld' for only send req. for 'helloWorld' not send any req. like 'h' 'he' 'hel'
    fromEvent<any>(this.inputValue.nativeElement, 'keyup')
    .pipe(
      map(ev => ev.target.value),
      // startWith(''),  // when we refresh app it will use '' as initial search. So it will be search all list of item on initial search
      debounceTime(500),
      distinctUntilChanged(),  // Only emit when the current value is different than the last
      switchMap((search) => this.printInputValue(search))    // remove older ongoing req and send only new on
    ).subscribe();
    // .subscribe(search => this.debounceTimeValue = search);
  }

  rxjsThrottling() {
    // this method is optional of rxjs debounce method
    // throttle: Emit value on the leading edge of an interval, but suppress new values until durationSelector has completed.
    // so here we can use throttletime() to achive operation, and we dont need debouncetime() approach
    // throttleTime: Emit first value then ignore for specified duration
    fromEvent<any>(this.inputValue.nativeElement, 'keyup')
    .pipe(
      map(ev => ev.target.value),
      // throttle(() => interval(500)),  // not working as expected when we continuasly typing first time
      throttleTime(200),  // use instead throttle()
      ).subscribe(search => this.debounceTimeValue = search);
  }

  printInputValue(search = ''): Observable<any>{
    console.log('debounce time', search);
    this.debounceTimeValue = search;  // Do http call instead
    return from(search);
  }

  rxjsDistinctUntilChanged() {
    // only output distinct values, based on the last emitted value
    const source$ = from([1, 1, 2, 2, 3, 3]);
    source$.pipe(distinctUntilChanged()).subscribe(console.log);  // output: 1,2,3
    
    const sampleObject = { name: 'Test' };
    const source1$ = from([sampleObject, sampleObject, sampleObject]);  //Objects must be same reference
    source1$.pipe(distinctUntilChanged()).subscribe(console.log);  // only emit distinct objects, based on last emitted value
      // output: {name: 'Test'}  
  }

  rxjsOf() {
    // Conver list of value to observable stream
    of([ 1, 2, 3]).subscribe(val => console.log('Rxjs Array Of: ', val));  // Giving us array as observable
    // Output Rxjs Array Of:  (3) [1, 2, 3]
    of(1, 2, 3).subscribe(val => console.log('Rxjs Of: ', val)); // Giving us value as stream
    // Output: Rxjs Of:  1  
    // Rxjs Of:  2
    // Rxjs Of:  3
    const myFunction = () => {
      return 'Print this function line usinf From operator'
    };
    of(myFunction()).subscribe(val => console.log('Rxjs from function: ', val));
    // output: Rxjs from function: Print this function line using of operator
    // from() will print each latter in onservable stream
  }

  rxjsTapOperator() {
    // tap operator and it is used for side effects inside a stream such as logging
    const num = of(10,20,30,40,50);

    const exmaple = num.pipe(
      tap(val => console.log('Tap Val: ', val)),  // Tap used for logging
      map(val => val + 1),  // map will transform data
      tap(      // tap accept value, error and complete
        val => console.log(val),
        error => console.log(error),
        () => console.log('Tap on Complete')
      ));

      exmaple.subscribe(val => console.log('Tap final Value ', val));
  }

  rxjsFrom() {
    // Creates an Observable from an Array, an array-like object, a Promise, an iterable object, or an Observable-like object.

    const arrayVal = [12,23,34,54];
    const myFunction = () => {
      return 'ABC'  //Print this function line usinf From operator
    }
    const objectVal = {
      fname: 'Sahil',
      lname: 'Patel',
      age: 27
    };

    // Convert array to rxjs observable stream
    const obs1$ = from(arrayVal);
    obs1$.subscribe(val => console.log('Rxjs From ', val));

    // Print ffunction line usinf from()
    from(myFunction()).subscribe(val => console.log('Rxjs from function: ', val));
    // from() will print each charactor in stream
  }
}
