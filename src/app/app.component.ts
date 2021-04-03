import { Component, OnInit } from '@angular/core';
import { BehaviorSubjectService } from './utils/behavior-subject.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rxjs-sample';
  constructor(private behaviorSubjectService: BehaviorSubjectService) {}

  ngOnInit() {
    // Only load once so omit multiple http call. 
    this.behaviorSubjectService.loadTodos();
  }
}
