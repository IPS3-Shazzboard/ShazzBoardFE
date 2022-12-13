import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../song.service';
import { AppComponent } from '../app.component';
import { SongListComponent } from '../song-list/song-list.component';
import { ManualAddSongModalService } from '../manual-add-song-modal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manual-add-song-modal',
  templateUrl: './manual-add-song-modal.component.html',
  styleUrls: ['./manual-add-song-modal.component.scss'],
})
export class ManualAddSongModalComponent implements OnInit {
  song = new Song('', '', '', '');
  display$!: Observable<'open' | 'close'>;

  constructor(
    private songService: SongService,
    private songListComponent: SongListComponent,
    private modalService: ManualAddSongModalService
  ) {}

  ngOnInit() {
    this.display$ = this.modalService.watch();
  }

  addSongEntry(): void {
    this.songService.addSong(this.song).subscribe({
      next: (response: Song) => {
        console.log(response);
        this.songListComponent.ngOnInit();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  close() {
    this.modalService.close();
  }
}
