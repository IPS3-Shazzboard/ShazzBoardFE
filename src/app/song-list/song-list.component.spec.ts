import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Song } from '../song';
import { SongService } from '../song.service';

import { SongListComponent } from './song-list.component';

describe('SongListComponent', () => {
  let component: SongListComponent;
  let fixture: ComponentFixture<SongListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SongListComponent],
      providers: [HttpClient, HttpHandler],
    }).compileComponents();

    fixture = TestBed.createComponent(SongListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('SongListGet', () => {
  let fixture: ComponentFixture<SongListComponent>;
  let songListComponent: SongListComponent;
  let mockSongService: jasmine.SpyObj<SongService>;

  beforeEach(async () => {
    mockSongService = jasmine.createSpyObj('SongService', ['getSongs']);
    await TestBed.configureTestingModule({
      declarations: [SongListComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: SongService, useValue: mockSongService }],
    }).compileComponents();
    fixture = TestBed.createComponent(SongListComponent);
    songListComponent = fixture.componentInstance;
  });

  it('should correctly get songs from service', waitForAsync(() => {
    const mockSongList: Song[] = [
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
    const getSongsSpy = mockSongService.getSongs.and.returnValue(
      of(mockSongList)
    );
    songListComponent.getSongs();
    fixture.detectChanges();

    expect(getSongsSpy).toHaveBeenCalled();
    expect(songListComponent.songs).not.toBeNull();
    expect(songListComponent.songs).toEqual(mockSongList);
  }));

  it('should correctly return empty song list'),
    waitForAsync(() => {
      const mockSongList: Song[] = [];
      const getSongsSpy = mockSongService.getSongs.and.returnValue(
        of(mockSongList)
      );
      songListComponent.getSongs();
      fixture.detectChanges();

      expect(getSongsSpy).toHaveBeenCalled();
      expect(songListComponent.songs).not.toBeNull();
      expect(songListComponent.songs).toEqual(mockSongList);
    });
});
