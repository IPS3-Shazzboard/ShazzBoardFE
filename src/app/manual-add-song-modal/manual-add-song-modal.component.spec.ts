import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualAddSongModalComponent } from './manual-add-song-modal.component';

describe('ManualAddSongModalComponent', () => {
  let component: ManualAddSongModalComponent;
  let fixture: ComponentFixture<ManualAddSongModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualAddSongModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualAddSongModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
