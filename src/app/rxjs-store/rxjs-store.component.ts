import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { first, take } from 'rxjs/operators';
import { TodoModel } from '../model/todo.model';
import { BehaviorSubjectService } from '../utils/behavior-subject.service';

@Component({
  selector: 'app-rxjs-store',
  templateUrl: './rxjs-store.component.html',
  styleUrls: ['./rxjs-store.component.css']
})
export class RxjsStoreComponent implements OnInit {
  todoById$: Observable<TodoModel>;
  todosCompleted$: Observable<TodoModel[]>;
  todoById: TodoModel;

  // Just for sample, not implemented
  form: Form;
  todoId: number;

  constructor(private behaviorSubjectService: BehaviorSubjectService) { }

  ngOnInit() {
    // Using behaviorSubject we can make central store and call data only once in app.component
    // We can use it in multiple component without doing backed request. Data store in temp memory. 
    const todos$ = this.behaviorSubjectService.todos$;
    this.todosCompleted$ = this.behaviorSubjectService.filterByTodoCompleted(true);
    // this.todoById$ = this.behaviorSubjectService.filterById(1);
    this.behaviorSubjectService.filterById(1).subscribe(val => {
      console.log('todo val ', val);
      this.todoById = val;
    });

    this.rxjsForkJoin();
  }

  rxjsEditSave() {
    this.behaviorSubjectService.saveTodo(this.todoId, this.form['value']).subscribe(
      // () => this.close(), // close model
      (error) => console.log('Error in saving todos', error)
      );
  }

  rxjsForkJoin() {
    // Take only first value
    const todo$ = this.behaviorSubjectService.filterById(1).pipe(
      first(),  // only take first value emitted
      // take(5),  // if we want to take first 5 output
    )

    // Wait for Observables to complete and then combine last values they emitted.
    forkJoin(todo$, this.todosCompleted$).subscribe(console.log);
  }

}
