import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTrainComponent } from './create-train.component';

describe('CreateTrainComponent', () => {
  let component: CreateTrainComponent;
  let fixture: ComponentFixture<CreateTrainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTrainComponent]
    });
    fixture = TestBed.createComponent(CreateTrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
