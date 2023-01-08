import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../song.service';
import { AppComponent } from '../app.component';
import { SongListComponent } from '../song-list/song-list.component';
import { ManualAddSongModalService } from '../manual-add-song-modal.service';
import { NotificationToastComponent } from '../notification-toast/notification-toast.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manual-add-song-modal',
  templateUrl: './manual-add-song-modal.component.html',
  styleUrls: ['./manual-add-song-modal.component.scss'],
})
export class ManualAddSongModalComponent implements OnInit {
  song = new Song('', '', '', '');
  display$!: Observable<'open' | 'close'>;
  router = Router;

  constructor(
    private songService: SongService,
    private songListComponent: SongListComponent,
    private appComponent: AppComponent,
    private modalService: ManualAddSongModalService,
    private notificationToast: NotificationToastComponent
  ) {}

  ngOnInit() {
    this.display$ = this.modalService.watch();
  }

  addSongEntry(): void {
    this.songService.addSong(this.song).subscribe({
      next: (response: Song) => {
        this.notificationToast.showNotification(200, response);
        this.close();
      },
      error: (error: HttpErrorResponse) => {
        switch (error.status) {
          case 400:
            this.notificationToast.showNotification(400);
            break;
          case 409:
            this.notificationToast.showNotification(409, error.error);
            break;
        }
      },
    });
  }

  close() {
    this.modalService.close();
  }
}
