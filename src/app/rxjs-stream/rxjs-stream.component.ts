import { Component, OnInit } from '@angular/core';
import { fromEvent, interval, timer } from 'rxjs';

@Component({
  selector: 'app-rxjs-stream',
  templateUrl: './rxjs-stream.component.html',
  styleUrls: ['./rxjs-stream.component.css']
})
export class RxjsStreamComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.javascriptMethods();
    // this.excersice();
    // this.rxjsWay();
    // this.rxjsClick();
    // this.rxjsSubscribe();
  }

  javascriptMethods() {
    // Click any where in dom and print in console
    document.addEventListener('click', evnt => {
      console.log('This is click event listner');
    });

    setInterval(() => {
      console.log('Run on evenry 3 second time of interval');
    }, 3000);

    setTimeout(() => {
      console.log('only run one time after 5 second');
    }, 5000)
  }

  excersice() {
    document.addEventListener('click', (event) => {
      console.log('User clicked');

      setTimeout(() => {
        console.log('Start setTimeout');

        setInterval(() => {
          console.log('User click on screen then wait 3 second then start stream(print value in every iteration)');
        }, 2000);
      }, 3000)
    });
  }

  rxjsWay() {
    // Rxjs variable ended by varName$
    const interval$ = interval(1000);   // Run every 1 second

    // It will only stream only if we subscribe it
    interval$.subscribe((myInterval) => {
      console.log("Stream 1", myInterval);
    });

    // Each interval will emit it own values
    interval$.subscribe((myInterval) => {
      console.log("Stream 2", myInterval);
    });

    // First wait for 3 second then start emiting value after 1 second
    const myTimer$ = timer(3000, 1000); // First arg wait 3 sec initially, sec. arg emit after 1 sec
     myTimer$.subscribe((myTimer) => {
      console.log("Timer: ", myTimer);
    }); 
  }

  rxjsClick() {
    const click$ = fromEvent(document, 'click');
    click$.subscribe((clk) => console.log(clk));
  }

  rxjsSubscribe() {
    const click$ = fromEvent(document, 'click');
    click$.subscribe(
      (value) => console.log(value),   // First arf for observable is always value
      (err) => console.log(err),  // If anything wrong it will recerive error on sec arg
      () => console.log('completed')  // If receive all value and has no error then recieve completed
    );

    // Unsubscribe. Prevent new value for subscribe
    const interval$ = interval(1000);   // Run every 1 second

    const myVal = interval$.subscribe((myInterval) => console.log("Stream 1", myInterval));

    setTimeout(() => {
      myVal.unsubscribe();
    }, 5000); // Remove subscription after 5 second
    
  }
}
