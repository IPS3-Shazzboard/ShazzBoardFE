import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Song } from '../song';
import { SongService } from '../song.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-modal',
  templateUrl: './manual-add-song-modal.component.html',
  styleUrls: ['./manual-add-song-modal.component.scss'],
})
export class ManualAddSongModalComponent {
  song = new Song('', '', '', '');

  constructor(
    private songService: SongService,
    private appComponent: AppComponent,
    public modalRef: MdbModalRef<ManualAddSongModalComponent>
  ) {}

  addSongEntry(): void {
    this.songService.addSong(this.song).subscribe({
      next: (response: Song) => {
        console.log(response);
        this.appComponent.ngOnInit();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
}
