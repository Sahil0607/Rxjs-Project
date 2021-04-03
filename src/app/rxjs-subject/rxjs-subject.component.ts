import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-rxjs-subject',
  templateUrl: './rxjs-subject.component.html',
  styleUrls: ['./rxjs-subject.component.css']
})
export class RxjsSubjectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // some of the data will not easilt transformation into observable or multicasting then we need subject
    // multicasting: One valu to mutiple observable consumers 

    this.rxjsSubject();
    this.rxjsBehaviorSubject();
    this.rxjsAsyncSubject();
    this.rxjsReplaySubject();
  }

  rxjsSubject() {
    // Regular observable is not good idea to share outside of component, so we need to use subject()
    const subject = new Subject();

    // This emiting value of subject. Define observable
    const series$ = subject.asObservable(); // Return observable of emitting value
    // series$ we can share with other component using series$.subscribe();

    series$.subscribe(val => console.log('Early Subject ', val));

    subject.next(1);
    subject.next(2);
    subject.next(3);

    // Check for late subscriber such as async operation(Ex: http operation)
    // Subject() will not provide value for late sub., so we have to use BehaviorSubject()
    // BehaviorSubject({value: 'Sahil'}) will also give us initial value.
    setTimeout(() => {
      series$.subscribe(val => console.log('Late Subject ', val));
    }, 3000);

    subject.complete();

    // This will not print because observable stream is completed
    subject.next(4);

    // Along with next(), we can do multiple opearion of subject such as error, pipe, complete
    // subject.error('This is error');
    // subject.complete();
    // subject.pipe();
  }

  rxjsBehaviorSubject() {
    // BehaviorSubject will take initial value and also provide value to late subscriber
    const initialValue = 10;
    const behaviorSubject = new BehaviorSubject(initialValue); 

    const series$ = behaviorSubject.asObservable();

    series$.subscribe(val => console.log('Early BehaviorSubject ', val));

    behaviorSubject.next(20);
    behaviorSubject.next(30);
    behaviorSubject.next(40);

    setTimeout(() => {
      series$.subscribe(val => console.log('Late BehaviorSubject ', val));
      // This value will emit both eary and late subscribers same as Subject().
      behaviorSubject.next(50);
    },2000);

    // behaviorSubject.complete();

    // Will not give us any value after complete()
    // series$.subscribe(val => console.log('After Complete BehaviorSubject ', val));
  }

  rxjsAsyncSubject() {
    // AsyncSubject is ideal for long running opearation
    const asyncSubject = new AsyncSubject();
    const series$ = asyncSubject.asObservable();

    asyncSubject.next(1);
    asyncSubject.next(2);
    asyncSubject.next(3);

    // Will not provide value untill all the opration complete and complete() method execute
    // it will provide last value which is emitted, here it is 3.
    series$.subscribe(val => console.log('Early AsyncSubject: ', val));

    // AsyncSubject will not give us any value without complete()
    asyncSubject.complete();  

    setTimeout(() => {
      // async give us latest value emitted after all long running op. completed
      // It will not receive intermediate value such as 1 and 2.
      // ReplaySubject will give us all intermediate value
      series$.subscribe(val => console.log('Late AsyncSubject: ', val));
    });
  }

  rxjsReplaySubject() {
    // ReplaySubject will give us all intermediate value
    // Dont have to wait for observable to complete, late subscriber will get all the value like early sub
    const replaySubject = new ReplaySubject();
    const series$ = replaySubject.asObservable();

    series$.subscribe(val => console.log('Early ReplaySubject: ', val));

    replaySubject.next(1);
    replaySubject.next(2);
    replaySubject.next(3);

    replaySubject.complete();

    // late sub. will receive all the val. even after complete() method
    setTimeout(() => {
      series$.subscribe(val => console.log('Late ReplaySubject: ', val));
      // Will not print value as usaul like other Subject.
      replaySubject.next(4);
    }, 3000);
  }

}
