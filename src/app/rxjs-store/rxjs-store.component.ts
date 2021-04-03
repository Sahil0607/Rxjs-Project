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

  constructor(private behaviorSubjectService: BehaviorSubjectService) { }

  ngOnInit() {
    const todos$ = this.behaviorSubjectService.todos$;
    this.todosCompleted$ = this.behaviorSubjectService.filterByTodoCompleted(true);
    // this.todoById$ = this.behaviorSubjectService.filterById(1);
    this.behaviorSubjectService.filterById(1).subscribe(val => console.log('todo val ', val));
  }

}
