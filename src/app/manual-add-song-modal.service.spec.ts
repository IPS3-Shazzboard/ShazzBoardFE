import { TestBed } from '@angular/core/testing';

import { ManualAddSongModalService } from './manual-add-song-modal.service';

describe('ModalService', () => {
  let service: ManualAddSongModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManualAddSongModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
