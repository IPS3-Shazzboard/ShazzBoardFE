import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SongInfoModalComponent } from './song-info-modal/song-info-modal.component';
import { ManualAddSongModalComponent } from './manual-add-song-modal/manual-add-song-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Song } from './song';
import { SongService } from './song.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ShazzBoardFE';
  public songs: Song[] | undefined;
  modalSongInfoRef: MdbModalRef<SongInfoModalComponent> | null = null;
  modalManualAddSongRef: MdbModalRef<ManualAddSongModalComponent> | null = null;

  constructor(
    private songService: SongService,
    private modalService: MdbModalService
  ) {}

  ngOnInit() {
    this.getSongs();
  }

  public getSongs(): void {
    this.songService.getSongs().subscribe({
      next: (response: Song[]) => {
        this.songs = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  openSongInfoModal(item: any) {
    this.modalSongInfoRef = this.modalService.open(SongInfoModalComponent, {
      data: { name: item.name, artist: item.artist, duration: item.duration },
    });
  }

  openManualAddSongModal() {
    this.modalManualAddSongRef = this.modalService.open(
      ManualAddSongModalComponent
    );
  }
}
