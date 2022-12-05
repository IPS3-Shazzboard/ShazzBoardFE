import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { SongInfoModalService } from '../song-info-modal.service';
import { SongService } from '../song.service';

@Component({
  selector: 'app-modal',
  templateUrl: './song-info-modal.component.html',
  styleUrls: ['./song-info-modal.component.scss'],
})
export class SongInfoModalComponent implements OnInit {
  @Input() songId!: number;
  @Input() songName!: string;
  @Input() songArtist!: string;
  @Input() songDuration!: string;
  @Input() songCoverArt!: string;
  display$!: Observable<'open' | 'close'>;
  constructor(
    private songService: SongService,
    private appComponent: AppComponent,
    private modalService: SongInfoModalService
  ) {}

  ngOnInit() {
    this.display$ = this.modalService.watch();
  }

  deleteSongEntry(): void {
    this.songService.deleteSong(this.songId).subscribe({
      next: (response: void) => {
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
