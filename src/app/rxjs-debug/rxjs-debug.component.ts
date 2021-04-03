import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin, from, fromEvent, Observable, of, pipe, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { debug, RxJsLoggingLevel } from './debug';

@Component({
  selector: 'app-rxjs-debug',
  templateUrl: './rxjs-debug.component.html',
  styleUrls: ['./rxjs-debug.component.css']
})
export class RxjsDebugComponent implements OnInit, AfterViewInit {
  posts: any[] = [];
  debounceTimeValue: string = '';
  @ViewChild('debounceTime') inputValue: ElementRef;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.rxjsTap();
    this.rxjsForkJoin();
  }

  ngAfterViewInit() {
    this.rxjsDebug();
  }

  rxjsTap() {
    // Usually we are using rxjs tap() operator for debugging
    // as our app getting complex we will need tap operator in observable chain and get lot of output in console
    // we need to turn on and off logging statment so we need debugging operator

    const url = 'https://jsonplaceholder.typicode.com/posts';
    this.http.get<any>(url).pipe(
      // tap(post => console.log('Tap post', post)), // use debug instead tap()
      debug(RxJsLoggingLevel.INFO, 'course value ')
    ).subscribe(data => this.posts = data);
  }
 
  rxjsDebug() {
    // custo debug take two argument
    fromEvent<any>(this.inputValue.nativeElement, 'keyup')
    .pipe(
      map(ev => ev.target.value),
      debug(RxJsLoggingLevel.INFO, 'search'),  // custom debug, we can use TRACE, DEBUG or ERROR enum instead of info
      debounceTime(500),
      distinctUntilChanged(),  
      switchMap((search) => this.printInputValue(search)),
      debug(RxJsLoggingLevel.INFO, 'final result')  // we can add it wherever we want
    ).subscribe();
  }

  printInputValue(search = ''): Observable<any>{
    console.log('debounce time', search);
    this.debounceTimeValue = search;  // Do http call instead
    return from(search);
  }

  rxjsForkJoin() {
    // Forkjoin() will only execute if all the observable is completed which is used inside.
    // So result will be { foo: 4, bar: 8, baz: 0 } after 4 seconds
    const observable = forkJoin({
      foo: of(1, 2, 3, 4),
      bar: Promise.resolve(8),
      baz: timer(4000),
    });
    observable.subscribe({
     next: value => console.log(value),
     complete: () => console.log('This is how it ends!'),
    });

    forkJoin(of(1, 2, 3, 4), of(8, 5, 6)).pipe(
      tap(([course, lesson]) => {
         console.log('course ', course);
         console.log('lesson ', lesson);
      })
    ).subscribe();
    
  }

}
