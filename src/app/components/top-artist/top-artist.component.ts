import { Component, OnInit } from '@angular/core';
import { newArtist } from 'src/app/common/factories';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.scss']
})
export class TopArtistComponent implements OnInit {

  topArtist = newArtist()

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getArtist();
  }

  async getArtist() {
    const artists = this.spotifyService.getTopArtists(1);

    if (!!artists)
      this.topArtist = (await artists).pop();

  }

}
