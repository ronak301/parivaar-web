import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersListingComponent } from './members-listing.component';

describe('MembersListingComponent', () => {
  let component: MembersListingComponent;
  let fixture: ComponentFixture<MembersListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
