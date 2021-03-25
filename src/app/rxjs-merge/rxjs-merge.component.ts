import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { interval, merge } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-merge',
  templateUrl: './rxjs-merge.component.html',
  styleUrls: ['./rxjs-merge.component.css']
})
export class RxjsMergeComponent implements OnInit {
  form: FormGroup;
  mergeMapValue: string = '';
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.rxjsMerge();
    this.form = this.fb.group({
      value1: ['', Validators.required],
      value2: ['', Validators.required],
    }); 
    this.rxjsMergeMap();
  }

  rxjsMerge() {
    const interval1$ = interval(1000);
    const interval2$ = interval1$.pipe(map(val => val * 100));
    // Using pipe we can continue observable streaming. It will create new observable from old observable
    // Using map we can modify observable. Always use map in pipe().
    const mergeVal$ = merge(interval1$, interval2$);

    // Merge will merge two observable synchroneasly
    mergeVal$.subscribe(console.log); // Shortcut of console.log subscribe
  }

  rxjsMergeMap() {
    // Send req to backend parallely instead of wait to complete first one.
    // This is reverse of concatMap. 
    // concatMap will wait for first to complete and mergeMap will send req parallely. Not wait to complete firstone
    // We can check in network xhr tab
    // Ideal to send http req in parallel. Code is same as concatMap, chage is mergeMap().
    
    this.form.valueChanges.pipe(
      filter(() => this.form.valid),
      mergeMap(async (changes) => this.mergeMapValue = changes.value1 + ' ' + changes.value2)
    ).subscribe();
  }

  onSubmit() {}
}
