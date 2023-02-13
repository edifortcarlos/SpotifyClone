import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPause, faPlay, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusic } from 'src/app/common/factories';
import { IMusic } from 'src/app/interfaces/IMusic';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  music: IMusic = newMusic();

  subs: Subscription[] = [];

  // Icons
  backwardIcon = faStepBackward;
  forewardIcon = faStepForward;
  playIcon = faPlay;
  pauseIcon = faPause;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getPlayingSong()
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getPlayingSong() {
    const sub = this.playerService.actualMusic.subscribe(music => this.music = music);

    this.subs.push(sub);
  }

  previousMusic() {
    this.playerService.previousMusic();
  }

  nextMusic() {
    this.playerService.nextMusic();
  }

}
