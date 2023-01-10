import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHandler,
} from '@angular/common/http';
import { ManualAddSongModalComponent } from './manual-add-song-modal.component';
import { AppComponent } from '../app.component';
import { SongListComponent } from '../song-list/song-list.component';
import { SongService } from '../song.service';
import { Song } from '../song';
import { of, throwError } from 'rxjs';
import { NotificationToastComponent } from '../notification-toast/notification-toast.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

describe('ManualAddSongModalComponent', () => {
  let component: ManualAddSongModalComponent;
  let fixture: ComponentFixture<ManualAddSongModalComponent>;
  let spy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManualAddSongModalComponent],
      providers: [
        HttpClient,
        HttpHandler,
        AppComponent,
        ManualAddSongModalComponent,
        SongListComponent,
        NotificationToastComponent,
      ],
      imports: [
        FormsModule,
        ToastrModule.forRoot({
          timeOut: 10000,
          positionClass: 'toast-bottom-right',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManualAddSongModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addSongEntry method', () => {
    let service = TestBed.inject(ManualAddSongModalComponent);
    spy = spyOn(service, 'addSongEntry');
    service.addSongEntry();
    expect(spy).toHaveBeenCalled();
  });

  it('should call close method', () => {
    let service = TestBed.inject(ManualAddSongModalComponent);
    spy = spyOn(service, 'close');
    service.close();
    expect(spy).toHaveBeenCalled();
  });
});

describe('AddSongEntry', () => {
  let component: ManualAddSongModalComponent;
  let fixture: ComponentFixture<ManualAddSongModalComponent>;
  let notificationSpy: any;
  let addSongSpy: any;
  let mockSongService: jasmine.SpyObj<SongService>;

  beforeEach(async () => {
    mockSongService = jasmine.createSpyObj('SongService', ['addSong']);
    await TestBed.configureTestingModule({
      declarations: [ManualAddSongModalComponent],
      providers: [
        HttpClient,
        HttpHandler,
        AppComponent,
        ManualAddSongModalComponent,
        SongListComponent,
        NotificationToastComponent,
        { provide: SongService, useValue: mockSongService },
      ],
      imports: [
        ToastrModule.forRoot({
          timeOut: 10000,
          positionClass: 'toast-bottom-right',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManualAddSongModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call notification toast with valid entry', () => {
    let mockNotificationToast = TestBed.inject(NotificationToastComponent);
    notificationSpy = spyOn(mockNotificationToast, 'showNotification');
    mockNotificationToast = jasmine.createSpyObj('NotificationToastComponent', [
      'showNotification',
    ]);
    const mockNewSong: Song = new Song(
      'song1',
      'artist1',
      'duration',
      'coverArt'
    );
    const mockResponse: Song = new Song(
      'song1',
      'artist1',
      'duration',
      'coverArt',
      1
    );
    addSongSpy = mockSongService.addSong
      .withArgs(mockNewSong)
      .and.returnValue(of(mockResponse));
    component.song = mockNewSong;
    component.addSongEntry();
    fixture.detectChanges();

    expect(addSongSpy).toHaveBeenCalled();
    expect(notificationSpy).toHaveBeenCalled();
  });

  it('should call notification toast with invalid input', () => {
    let mockNotificationToast = TestBed.inject(NotificationToastComponent);
    notificationSpy = spyOn(mockNotificationToast, 'showNotification');
    mockNotificationToast = jasmine.createSpyObj('NotificationToastComponent', [
      'showNotification',
    ]);
    const mockNewSong: Song = new Song('song1', 'artist1', 'duration', '');
    addSongSpy = mockSongService.addSong
      .withArgs(mockNewSong)
      .and.returnValue(
        throwError(() => new HttpErrorResponse({ status: 400 }))
      );
    component.song = mockNewSong;
    component.addSongEntry();
    fixture.detectChanges();

    expect(addSongSpy).toHaveBeenCalled();
    expect(notificationSpy).toHaveBeenCalled();
  });

  it('should call notification toast with duplicate entry', () => {
    let mockNotificationToast = TestBed.inject(NotificationToastComponent);
    notificationSpy = spyOn(mockNotificationToast, 'showNotification');
    mockNotificationToast = jasmine.createSpyObj('NotificationToastComponent', [
      'showNotification',
    ]);
    const mockNewSong: Song = new Song(
      'song1',
      'artist1',
      'duration',
      'coverArt'
    );
    addSongSpy = mockSongService.addSong
      .withArgs(mockNewSong)
      .and.returnValue(
        throwError(() => new HttpErrorResponse({ status: 409 }))
      );
    component.song = mockNewSong;
    component.addSongEntry();
    fixture.detectChanges();

    expect(addSongSpy).toHaveBeenCalled();
    expect(notificationSpy).toHaveBeenCalled();
  });
});
