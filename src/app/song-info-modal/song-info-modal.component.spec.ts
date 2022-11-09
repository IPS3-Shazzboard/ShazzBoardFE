import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongInfoModalComponent } from './song-info-modal.component';

describe('ModalComponent', () => {
  let component: SongInfoModalComponent;
  let fixture: ComponentFixture<SongInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SongInfoModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SongInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
