import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Song } from './song';
import { SongService } from './song.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ShazzBoardFE';
  public songs: Song[] | undefined;

  constructor(private songService: SongService) {}

  ngOnInit() {
    this.getSongs();
  }

  public getSongs(): void {
    this.songService.getSongs().subscribe({
      next: (response: Song[]) => {
        this.songs = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
}
