import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './manual-add-song-modal.component.html',
  styleUrls: ['./manual-add-song-modal.component.css'],
})
export class ManualAddSongModalComponent {
  name: string | null = null;
  artist: string | null = null;
  duration: string | null = null;
  constructor(public modalRef: MdbModalRef<ManualAddSongModalComponent>) {}
}
