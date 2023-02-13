import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusic } from 'src/app/common/factories';
import { IMusic } from 'src/app/interfaces/IMusic';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {


  myMusics: IMusic[] = [];
  actualMusic: IMusic = newMusic();

  subs: Subscription[] = [];

  // Icon
  playIcon = faPlay;

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) { }


  ngOnInit(): void {
    this.getActualMusic()
    this.getMusics()
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  async getMusics() {
    this.myMusics = await this.spotifyService.getSavedTracks();
  }

  getArtists(music: IMusic) {
    return music.artists.map(artist => artist.name).join(', ');
  }

  async execMusic(music: IMusic) {
    await this.spotifyService.execMusic(music.id);
    this.playerService.setActualMusic(music);
  }

  getActualMusic() {
    const sub = this.playerService.actualMusic.subscribe(music => {
      this.actualMusic = music;
    })

    this.subs.push(sub);
  }

}
