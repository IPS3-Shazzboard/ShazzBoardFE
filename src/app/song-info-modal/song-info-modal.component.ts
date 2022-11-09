import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './song-info-modal.component.html',
  styleUrls: ['./song-info-modal.component.css'],
})
export class SongInfoModalComponent {
  name: string | null = null;
  artist: string | null = null;
  duration: string | null = null;
  constructor(public modalRef: MdbModalRef<SongInfoModalComponent>) {}
}
