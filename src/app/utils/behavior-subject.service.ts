import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { TodoModel } from '../model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class BehaviorSubjectService {

  private subject = new BehaviorSubject([]);
  todos$: Observable<TodoModel[]> = this.subject.asObservable();

  constructor(private httpClient: HttpClient) { }

  // This will only executed once when app is load first time. So use it in app.component.ts file.
  loadTodos() {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    this.httpClient.get<TodoModel[]>(url).pipe(
      tap(() => console.log('Http request executed')) // tap is use just for debugging purpose
    ).subscribe(todos => this.subject.next(todos));
  }

  filterByTodoCompleted(complted) {
    return this.todos$.pipe(
      map(todos => todos.filter(todo => todo['completed'] === complted ))
    );
  }

  filterById(id: number) {
    return this.todos$.pipe(
      map(todos => todos.find(todo => todo.id == id)), // Also use filter() or findIndex() method
      filter(todos => !!todos)  // check initailly when subject is emapty []
      );
  }

  saveTodo(todoId, changes): Observable<any> {
    // get complete array of todos using getValue() method
    const todos = this.subject.getValue();
    const todoIndex = todos.findIndex(todo => todo.id == todoId);

    // take todo and copy it
    const newTodos = todos.slice(0);

    // updating value using immutable way
    // update local store and using change updated object
    newTodos[todoIndex] = {
      ...todos[todoIndex],
      ...changes  // spread oprator apply on to of the copy
    }

    this.subject.next(newTodos);  // broadcast new changes

    // return fromPromise(); // fromPromise is no longer a part of the RxJS. You should use from instead.
    const url = 'https://jsonplaceholder.typicode.com/todos';
    return this.httpClient.put(`${url}/${todoId}`, changes);
  }
}
