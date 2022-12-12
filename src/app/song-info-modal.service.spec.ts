import { TestBed } from '@angular/core/testing';

import { SongInfoModalService } from './song-info-modal.service';

describe('SongInfoModalService', () => {
  let service: SongInfoModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongInfoModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
