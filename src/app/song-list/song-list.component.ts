import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../song.service';
import { ManualAddSongModalService } from '../manual-add-song-modal.service';
import { SongInfoModalService } from '../song-info-modal.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit {
  public songs: Song[] | undefined;
  songId!: number;
  songName!: string;
  songArtist!: string;
  songDuration!: string;
  songCoverArt!: string;

  constructor(
    private songService: SongService,
    private manualAddSongModalService: ManualAddSongModalService,
    private songInfoModalService: SongInfoModalService
  ) {}

  ngOnInit() {
    console.log('refresh1');
    this.getSongs();
    console.log('refresh2');
  }

  public getSongs(): void {
    this.songService.getSongs().subscribe({
      next: (response: Song[]) => {
        this.songs = response;
        console.log(this.songs);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  openSongInfoModal(item: Song) {
    this.songName = item.name;
    this.songArtist = item.artist;
    this.songDuration = item.duration;
    this.songCoverArt = item.coverArt;
    this.songId = item.id!;
    this.songInfoModalService.open();
  }

  openManualAddSongModal() {
    this.manualAddSongModalService.open();
  }
}
