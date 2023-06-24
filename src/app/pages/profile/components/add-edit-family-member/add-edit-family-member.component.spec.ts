import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFamilyMemberComponent } from './add-edit-family-member.component';

describe('AddEditFamilyMemberComponent', () => {
  let component: AddEditFamilyMemberComponent;
  let fixture: ComponentFixture<AddEditFamilyMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFamilyMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFamilyMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
