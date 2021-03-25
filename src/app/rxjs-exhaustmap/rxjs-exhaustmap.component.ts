import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { fromEvent, interval, merge } from 'rxjs';
import { exhaustMap, filter, map, mergeMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-exhaustmap',
  templateUrl: './rxjs-exhaustmap.component.html',
  styleUrls: ['./rxjs-exhaustmap.component.css']
})
export class RxjsExhaustmapComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  exhaustMapCount: number = 0;
  exhaustMapValue: string = '';

  @ViewChild('saveButton') mySaveButton: ElementRef;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      value1: ['', Validators.required],
    }); 
    this.rxjsExhaustMap();
  }

  ngAfterViewInit() {
    // When we click on save button ngAfterViewInit will run and perform below operation
    // Best use is draft form or edit form and also use in unterceptors for incoming and outgoing req. 
    const clicks$ = fromEvent(this.mySaveButton.nativeElement, 'click');
    const result$ = clicks$.pipe(
      exhaustMap(ev => interval(1500).pipe(take(4))),  // take(4) will take only 4 emited value then it will unsubscribe
    );
    result$.subscribe(x => {
      this.exhaustMapCount = x;
    });
    
    // First click it will wait for 1 second, oce it will complete then it will start second
    // Without subscribe it will not call this method
  }

  rxjsExhaustMap() {
    // Merged in output observable only if previos observable is completed
    // Ex: When we click on submit button it will not allow us click again untill first request is completed
    // We can continue send request once the older request completed
    // It will ignore the value if stream is not completed
    

    this.form.valueChanges.pipe(
      filter(() => this.form.valid),
      exhaustMap((changes) => interval(5000).pipe(take(1)))
    ).subscribe(value => {
      this.exhaustMapValue = this.form.value.value1;
    });
    // It will not submit immediatly, but will wait for one request to complete
  }

  onSubmit() {}
}
