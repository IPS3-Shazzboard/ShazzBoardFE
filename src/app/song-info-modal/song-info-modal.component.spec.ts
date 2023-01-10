import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SongInfoModalComponent } from './song-info-modal.component';
import { AppComponent } from '../app.component';
import { SongListComponent } from '../song-list/song-list.component';

describe('SongInfoModalComponent', () => {
  let component: SongInfoModalComponent;
  let fixture: ComponentFixture<SongInfoModalComponent>;
  let spy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SongInfoModalComponent],
      providers: [
        HttpClient,
        HttpHandler,
        AppComponent,
        SongInfoModalComponent,
        SongListComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SongInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteSongEntry method', () => {
    let service = TestBed.inject(SongInfoModalComponent);
    spy = spyOn(service, 'deleteSongEntry');
    service.deleteSongEntry(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call close method', () => {
    let service = TestBed.inject(SongInfoModalComponent);
    spy = spyOn(service, 'close');
    service.close();
    expect(spy).toHaveBeenCalled();
  });
});
