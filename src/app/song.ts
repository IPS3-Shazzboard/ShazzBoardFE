export class Song {
  id?: number;
  name: string;
  artist: string;
  duration: string;
  coverArt: string;
  constructor(
    name: string,
    artist: string,
    duration: string,
    coverArt: string,
    id?: number
  ) {
    this.name = name;
    this.artist = artist;
    this.duration = duration;
    this.coverArt = coverArt;
    this.id = id;
  }
}
