export class Song {
  name: string;
  artist: string;
  duration: string;
  coverArt: string;
  constructor(
    name: string,
    artist: string,
    duration: string,
    coverArt: string
  ) {
    this.name = name;
    this.artist = artist;
    this.duration = duration;
    this.coverArt = coverArt;
  }
}
