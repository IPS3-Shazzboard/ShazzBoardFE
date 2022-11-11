import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from './song';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiServerUrl}/song/all`);
  }

  public addSong(song: Song): Observable<Song> {
    return this.http.post<Song>(`${this.apiServerUrl}/song/add`, song);
  }

  public deleteSong(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/song/delete/${id}`);
  }
}
