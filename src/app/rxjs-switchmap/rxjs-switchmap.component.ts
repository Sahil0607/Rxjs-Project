import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, interval, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

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
    this.rxjsSwitchMap();
    this.rxjsOf()
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
    // debounceTime is best use in search keyup event
    // It will wait for some time to user type. It will not send req. on every keyup method
    // For ex: 'helloWorld' for only send req. for 'helloWorld' not send any req. like 'h' 'he' 'hel'
    fromEvent<any>(this.inputValue.nativeElement, 'keyup')
    .pipe(
      map(ev => ev.target.value),
      debounceTime(500),
      distinctUntilChanged(),
      // switchMap((search) => this.printInputValue(search))    // remove older ongoing req and send only new on
    ).subscribe(search => this.debounceTimeValue = search);
  }

  printInputValue(search){
    console.log('debounce time', search);
    this.debounceTimeValue = search;  // Do http call instead
  }

  rxjsOf() {
    // Conver list of value to observable stream
    of([ 1, 2, 3]).subscribe(val => console.log('Rxjs Array Of: ', val));  // Giving us array as observable
    // Output Rxjs Array Of:  (3) [1, 2, 3]
    of(1, 2, 3).subscribe(val => console.log('Rxjs Of: ', val)); // Giving us value as stream
    // Output: Rxjs Of:  1  
    // Rxjs Of:  2
    // Rxjs Of:  3
  }
}
