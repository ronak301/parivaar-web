import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutivesMembersListingComponent } from './executives-members-listing.component';

describe('ExecutivesMembersListingComponent', () => {
  let component: ExecutivesMembersListingComponent;
  let fixture: ComponentFixture<ExecutivesMembersListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecutivesMembersListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutivesMembersListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
