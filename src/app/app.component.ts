import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Song } from './song';
import { SongService } from './song.service';
import { ManualAddSongModalService } from './manual-add-song-modal.service';
import { SongInfoModalService } from './song-info-modal.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ShazzBoardFE';
  public songs: Song[] | undefined;
  songId!: number;
  songName!: string;
  songArtist!: string;
  songDuration!: string;
  songCoverArt!: string;

  constructor(
    private songService: SongService,
    private manualAddSongModalService: ManualAddSongModalService,
    private songInfoModalService: SongInfoModalService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.getSongs();
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
