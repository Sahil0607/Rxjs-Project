import { Component, OnInit } from '@angular/core';
import { CreateObservableService } from '../utils/create-observable.service';
import { map, shareReplay, tap } from 'rxjs/operators';
import { CourseModel } from '../model/courses.model';
import { Observable } from 'rxjs';
import { PostModel } from '../model/post.model';

@Component({
  selector: 'app-rxjs-operator',
  templateUrl: './rxjs-operator.component.html',
  styleUrls: ['./rxjs-operator.component.css']
})
export class RxjsOperatorComponent implements OnInit {
  beginerCourse: CourseModel[];
  advanceCourse: CourseModel[];
  courses: any[];
  advanceCourseType: boolean = false;

  // rxjs ReactiveDesign
  // Now we can use observable instead of beginerCourse and advanceCourse variable
  beginerCourse$: Observable<any[]>;  // Observable<CourseModel[]> Not working so used any[]
  advanceCourse$: Observable<any[]>;   // Observable<CourseModel[]> not working

  constructor(private createObservableService: CreateObservableService) { }

  ngOnInit(): void {
    // this.rxjsMap();
    // this.rxjsReactiveDesign();
  }

  changeCourseType() {
    this.advanceCourseType = !this.advanceCourseType;
  }

  rxjsMap() {
    const http$ = this.createObservableService.createFatchObservable('assets/mock-data.json');
    const courses$ = http$.pipe(  // create observable from http$ (existing observable)
      // return new observable
      // map() will manipulate the response. Ex: convert in to array.
      map(res => Object.values(res['payload']))
    );
    
    // check output
    courses$.subscribe(courses => {
        this.courses = courses;
        console.log(courses);
        this.beginerCourse = this.courses.filter(course => course['category'] === 'Beginner');
        this.advanceCourse = this.courses.filter(course => course['category'] === 'Advance');
      }
    );
  }

  rxjsReactiveDesign() {
    const http$ = this.createObservableService.createFatchObservable('assets/mock-data.json');
    // We want this sream to only execute once so use sharereplay(). And when we subscribe it will do replay it and not do other api call
    const courses$ = http$.pipe( 
      // tap() used in update somethimg outside of observable chain such as update variable or log.
       // tap is produce sideeffect in observable chain, Used here just for testing
      tap(() => console.log('Http request executed')),
      map(res => Object.values(res['payload'])),
      shareReplay(), // Stop dubplicate subscription
      // We have to modify default observable behavior to create complete new stream by subscription
    );

    // Here we are doing 2 backaged call.
    // Dont forget to use '| async' with variable in html
    this.beginerCourse$ = courses$.pipe(
      map(courses => courses.filter(course => course['category'] === 'Beginner'))
    );
    // Filter in pipe is different then array filter. It will filter observable stream

    this.advanceCourse$ = courses$.pipe(
      map(courses => courses.filter(course => course['category'] === 'Advance'))
    );
    // If we go chrome network tab and click xhr we can see 2 mock-data.json call
    // So we dont have to do 2 call instead we have to do 1 call
  }
}
