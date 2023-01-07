import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ManualAddSongModalService } from '../manual-add-song-modal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private manualAddSongModalService: ManualAddSongModalService
  ) {}

  ngOnInit(): void {}

  openManualAddSongModal() {
    this.manualAddSongModalService.open();
  }
}
