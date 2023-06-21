import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCommunitiesComponent } from './manage-communities.component';

describe('ManageCommunitiesComponent', () => {
  let component: ManageCommunitiesComponent;
  let fixture: ComponentFixture<ManageCommunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCommunitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCommunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
