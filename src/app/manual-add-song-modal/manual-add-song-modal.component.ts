import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Song } from '../song';
import { SongService } from '../song.service';
import { AppComponent } from '../app.component';
import { ModalService } from '../modal.service';
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
    private appComponent: AppComponent,
    //public modalRef: MdbModalRef<ManualAddSongModalComponent>
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.display$ = this.modalService.watch();
  }

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

  close() {
    this.modalService.close();
  }
}
