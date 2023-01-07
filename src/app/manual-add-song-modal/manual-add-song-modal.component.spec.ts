import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ManualAddSongModalComponent } from './manual-add-song-modal.component';
import { AppComponent } from '../app.component';
import { ManualAddSongModalService } from '../manual-add-song-modal.service';
import { SongListComponent } from '../song-list/song-list.component';
import { SongService } from '../song.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Song } from '../song';
import { of } from 'rxjs';

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

describe('SongListDeleteEntry', () => {
  let songListFixture: ComponentFixture<SongListComponent>;
  let manualAddSongModalFixture: ComponentFixture<ManualAddSongModalComponent>;
  let songListComponent: SongListComponent;
  let manualAddSongModalComponent: ManualAddSongModalComponent;
  let mockSongService: jasmine.SpyObj<SongService>;

  beforeEach(async () => {
    mockSongService = jasmine.createSpyObj('SongService', [
      'AddSong',
      'getSongs',
    ]);
    await TestBed.configureTestingModule({
      declarations: [SongListComponent, ManualAddSongModalComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: SongService, useValue: mockSongService },
        SongListComponent,
      ],
    }).compileComponents();
    songListFixture = TestBed.createComponent(SongListComponent);
    manualAddSongModalFixture = TestBed.createComponent(
      ManualAddSongModalComponent
    );
    songListComponent = songListFixture.componentInstance;
    manualAddSongModalComponent = manualAddSongModalFixture.componentInstance;
  });

  it('should correctly add a song entry', waitForAsync(() => {
    const mockSongListBeforeAddition: Song[] = [
      {
        name: 'song1',
        artist: 'artist1',
        duration: 'duration1',
        coverArt: 'cover1',
        id: 1,
      },
      {
        name: 'song2',
        artist: 'artist2',
        duration: 'duration2',
        coverArt: 'cover2',
        id: 2,
      },
    ];
    const mockSongListAfterAddition: Song[] = [
      {
        name: 'song1',
        artist: 'artist1',
        duration: 'duration1',
        coverArt: 'cover1',
        id: 1,
      },
      {
        name: 'song2',
        artist: 'artist2',
        duration: 'duration2',
        coverArt: 'cover2',
        id: 2,
      },
      {
        name: 'song3',
        artist: 'artist3',
        duration: 'duration3',
        coverArt: 'cover3',
        id: 3,
      },
    ];
    const getSongsSpyBeforeDeletion = mockSongService.getSongs.and.returnValue(
      of(mockSongListBeforeAddition)
    );
    songListComponent.getSongs();
    const getSongsSpyAfterDeletion = mockSongService.getSongs.and.returnValue(
      of(mockSongListAfterAddition)
    );
    songListFixture.detectChanges();

    expect(getSongsSpyBeforeDeletion).toHaveBeenCalled();
    expect(getSongsSpyAfterDeletion).toHaveBeenCalled();
    expect(songListComponent.songs).not.toBeNull();
    expect(songListComponent.songs).toEqual(mockSongListAfterAddition);
  }));
});
