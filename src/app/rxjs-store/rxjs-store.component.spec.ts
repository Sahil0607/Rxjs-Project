import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsStoreComponent } from './rxjs-store.component';

describe('RxjsStoreComponent', () => {
  let component: RxjsStoreComponent;
  let fixture: ComponentFixture<RxjsStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxjsStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxjsStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
