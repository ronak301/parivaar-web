import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditExecutiveMemberComponent } from './add-edit-executive-member.component';

describe('AddEditExecutiveMemberComponent', () => {
  let component: AddEditExecutiveMemberComponent;
  let fixture: ComponentFixture<AddEditExecutiveMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditExecutiveMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditExecutiveMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
