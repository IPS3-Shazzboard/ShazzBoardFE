import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SongInfoModalComponent } from './song-info-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

describe('SongInfoModalComponent', () => {
  let component: SongInfoModalComponent;
  let fixture: ComponentFixture<SongInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SongInfoModalComponent],
      providers: [HttpClient, HttpHandler, MdbModalService, MdbModalRef],
    }).compileComponents();

    fixture = TestBed.createComponent(SongInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
