import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RxjsStreamComponent } from './rxjs-stream/rxjs-stream.component';
import { RxjsObservableComponent } from './rxjs-observable/rxjs-observable.component';
import { RxjsOperatorComponent } from './rxjs-operator/rxjs-operator.component';
import { RxjsConcatComponent } from './rxjs-concat/rxjs-concat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxjsMergeComponent } from './rxjs-merge/rxjs-merge.component';
import { RxjsExhaustmapComponent } from './rxjs-exhaustmap/rxjs-exhaustmap.component';
import { RxjsSwitchmapComponent } from './rxjs-switchmap/rxjs-switchmap.component';
import { RxjsErrorHandlingComponent } from './rxjs-error-handling/rxjs-error-handling.component';
import { RxjsDebugComponent } from './rxjs-debug/rxjs-debug.component';
import { RxjsStoreComponent } from './rxjs-store/rxjs-store.component';
import { RxjsSubjectComponent } from './rxjs-subject/rxjs-subject.component';

@NgModule({
  declarations: [
    AppComponent,
    RxjsStreamComponent,
    RxjsObservableComponent,
    RxjsOperatorComponent,
    RxjsConcatComponent,
    RxjsMergeComponent,
    RxjsExhaustmapComponent,
    RxjsSwitchmapComponent,
    RxjsErrorHandlingComponent,
    RxjsDebugComponent,
    RxjsStoreComponent,
    RxjsSubjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
