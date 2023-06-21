import { TestBed } from '@angular/core/testing';

import { ManageCommunitiesService } from './manage-communities.service';

describe('ManageCommunitiesService', () => {
  let service: ManageCommunitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageCommunitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
