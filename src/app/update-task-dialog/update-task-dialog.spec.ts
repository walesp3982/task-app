import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaskDialog } from './update-task-dialog';

describe('UpdateTaskDialog', () => {
  let component: UpdateTaskDialog;
  let fixture: ComponentFixture<UpdateTaskDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTaskDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateTaskDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
