import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { SongService } from '../song.service';

@Component({
  selector: 'app-modal',
  templateUrl: './song-info-modal.component.html',
  styleUrls: ['./song-info-modal.component.scss'],
})
export class SongInfoModalComponent {
  id: number | null = null;
  name: string | null = null;
  artist: string | null = null;
  duration: string | null = null;
  constructor(
    private songService: SongService,
    public modalRef: MdbModalRef<SongInfoModalComponent>
  ) {}

  deleteSongEntry(): void {
    console.log('id: ' + this.id);
    this.songService.deleteSong(this.id!).subscribe({
      next: (response: void) => {
        console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
}
