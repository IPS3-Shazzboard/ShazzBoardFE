import { Component, Output, EventEmitter } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Song } from '../song';
import { SongService } from '../song.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-manual-add-song-modal',
  templateUrl: './manual-add-song-modal.component.html',
  styleUrls: ['./manual-add-song-modal.component.scss'],
})
export class ManualAddSongModalComponent {
  @Output() newSongEvent = new EventEmitter<Song>();
  song = new Song('', '', '', '');

  constructor(public modalRef: MdbModalRef<ManualAddSongModalComponent>) {}

  addSongEntry() {
    this.newSongEvent.emit(this.song);
  }
}
