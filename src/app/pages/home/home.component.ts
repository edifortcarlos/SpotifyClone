import { Component, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { IMusic } from 'src/app/interfaces/IMusic';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  myMusics: IMusic[] = [];

  // Icon
  playIcon = faPlay;

  constructor(private spotifyService: SpotifyService) { }


  ngOnInit(): void {
    this.getMusics()
  }

  async getMusics() {
    this.myMusics = await this.spotifyService.getSavedTracks();
  }

  getArtists(music: IMusic) {
    return music.artists.map(artist => artist.name).join(', ');
  }

  async execMusic(music: IMusic) {
    await this.spotifyService.execMusic(music.id);
  }

}
