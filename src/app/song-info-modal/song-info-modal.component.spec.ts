import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SongInfoModalComponent } from './song-info-modal.component';
import { AppComponent } from '../app.component';

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
    service.deleteSongEntry();
    expect(spy).toHaveBeenCalled();
  });

  it('should call close method', () => {
    let service = TestBed.inject(SongInfoModalComponent);
    spy = spyOn(service, 'close');
    service.close();
    expect(spy).toHaveBeenCalled();
  });
});
