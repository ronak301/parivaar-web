import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyMembersListingComponent } from './family-members-listing.component';

describe('FamilyMembersListingComponent', () => {
  let component: FamilyMembersListingComponent;
  let fixture: ComponentFixture<FamilyMembersListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyMembersListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyMembersListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
