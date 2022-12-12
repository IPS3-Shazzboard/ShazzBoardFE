import { TestBed } from '@angular/core/testing';
import { Song } from './song';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { SongService } from './song.service';

describe('SongService', () => {
  let songService: SongService;
  let client: HttpClient;
  let controller: HttpTestingController;
  let expectedSongs: Song[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SongService],
    });
    songService = TestBed.inject(SongService);
    client = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
    expectedSongs = [
      {
        name: 'song1',
        artist: 'artist1',
        duration: 'duration1',
        coverArt: 'coverArt1',
        id: 1,
      },
      {
        name: 'song2',
        artist: 'artist2',
        duration: 'duration2',
        coverArt: 'coverArt2',
        id: 2,
      },
    ] as Song[];
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(songService).toBeTruthy();
  });

  describe('getSongs', () => {
    let expectedUrl = 'http://localhost:8081/song/all';
    it('should get all songs', () => {
      songService.getSongs().subscribe({
        next: (songs) => expect(songs).toEqual(expectedSongs),
        error: fail,
      });

      const req = controller.expectOne(expectedUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedSongs);
    });
  });

  describe('addSong', () => {
    let expectedUrl = 'http://localhost:8081/song/add';
    it('should add song', () => {
      songService
        .addSong(new Song('song', 'artist', 'duration', 'coverArt'))
        .subscribe({
          error: fail,
        });
      const req = controller.expectOne(expectedUrl);
      expect(req.request.method).toEqual('POST');
    });
  });

  describe('deleteSong', () => {
    it('should delete song', () => {
      let expectedUrl = 'http://localhost:8081/song/delete/1';
      songService.deleteSong(1).subscribe({
        error: fail,
      });
      const req = controller.expectOne(expectedUrl);
      expect(req.request.method).toEqual('DELETE');
    });
    // it('should return error', () => {
    //   let expectedUrl = 'http://localhost:8081/song/delete/-1';
    //   let response: any;
    //   let errorResponse: any;
    //   const mockErrorResponse = {
    //     status: 500,
    //     statusText: 'Internal Server Error',
    //   };
    //   const data = 'Internal Server Error';
    //   spyOn(songService, 'deleteSong').and.callThrough();
    //   songService.deleteSong(-1).subscribe({
    //     next: (res) => (response = res),
    //     error: (err) => (errorResponse = err),
    //   });
    //   const req = controller.expectOne(expectedUrl).flush(data, errorResponse);
    //   expect(errorResponse).toBe(data);
    // });
  });
});
