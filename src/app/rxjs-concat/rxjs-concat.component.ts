import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { concat, of } from 'rxjs';
import { concatMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-concat',
  templateUrl: './rxjs-concat.component.html',
  styleUrls: ['./rxjs-concat.component.css']
})
export class RxjsConcatComponent implements OnInit {
  form: FormGroup;
  regularValue: string = '';
  concatMapValue: string = '';
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.rxjsConcat();

    this.form = this.fb.group({
      value1: ['', Validators.required],
      value2: ['', Validators.required],
    }); 

    this.rxjsRegularConcat();
    this.rxjsConcatMap();
  }

  rxjsConcat() {
    // of() - Converts the arguments to an observable sequence.
    const seq1$ = of(1, 2, 3);
    const seq2$ = of(4, 5, 6);
    const seq3$ = of(7, 8, 9);

    // Creates an output Observable which sequentially emits all values from given Observable and then moves on to the next.
    const result$ = concat(seq1$, seq2$, seq3$);
    result$.subscribe(res => console.log(res));
  }

  rxjsRegularConcat() {
    // this.form.valueChanges.subscribe(console.log);  // Shortcut for console.log in subscribe

    this.form.valueChanges.pipe(
      filter(() => this.form.valid)  // Return boolean based on form validation
    ).subscribe(value => {
      // This approch will not wait for completion. So we need to wait until previos save to complete.
      // For that we need to use concatMap operator. It is best to use for save operation
      this.regularValue = value.value1 + ' ' + value.value2
    });
  }

  rxjsConcatMap() {
    // Without concatMap() it will execute async way but we need to execute it syc. way.
    // Wait to complete first operatio and then will start next one.

    this.form.valueChanges.pipe(
      filter(() => this.form.valid),
      concatMap(async (changes) => this.concatMapValue = changes.value1 + ' ' + changes.value2)
    ).subscribe();
    // concatMap take value from valueChanges and create new observables in concatMap() then subscribe and concat to gather
    // If we are using http request we xan see slide delay of request in network xhr call
    // So our save operation working in sequence
  }

  onSubmit() {}
    
}
