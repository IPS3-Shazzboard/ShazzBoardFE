import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SongInfoModalComponent } from './song-info-modal/song-info-modal.component';
import { ManualAddSongModalComponent } from './manual-add-song-modal/manual-add-song-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Song } from './song';
import { SongService } from './song.service';
import { ModalService } from './modal.service';
import { SongInfoModalService } from './song-info-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ShazzBoardFE';
  public songs: Song[] | undefined;
  modalSongInfoRef: MdbModalRef<SongInfoModalComponent> | null = null;
  modalManualAddSongRef: MdbModalRef<ManualAddSongModalComponent> | null = null;
  songId!: number;
  songName!: string;
  songArtist!: string;
  songDuration!: string;
  songCoverArt!: string;

  constructor(
    private songService: SongService,
    private modalService: MdbModalService,
    private modalService2: ModalService,
    private songInfoModalService: SongInfoModalService
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

  openSongInfoModal(item: any) {
    // this.modalService.open({
    //   data: {
    //     id: item.id,
    //     name: item.name,
    //     artist: item.artist,
    //     duration: item.duration,
    //   },
    // });
    this.songId = item.id;
    this.songName = item.name;
    this.songArtist = item.artist;
    this.songDuration = item.duration;
    this.songCoverArt = item.coverArt;
    this.songInfoModalService.open();
  }

  openManualAddSongModal() {
    this.modalService2.open();
  }
}
