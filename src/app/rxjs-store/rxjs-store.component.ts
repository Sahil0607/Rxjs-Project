import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  }

}
