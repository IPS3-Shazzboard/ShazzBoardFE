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
}
