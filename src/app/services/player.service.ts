import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { newMusic } from '../common/factories';
import { IMusic } from '../interfaces/IMusic';
import { SpotifyService } from './spotify.service';

@Injectable({ providedIn: 'root' })
export class PlayerService {

    actualMusic = new BehaviorSubject<IMusic>(newMusic());

    timerId: any = null;

    constructor(private spotifyService: SpotifyService) {
        this.getActualMusic();
    }

    async getActualMusic() {
        clearTimeout(this.timerId);

        const music = await this.spotifyService.getActualMusic();
        this.setActualMusic(music);

        this.timerId = setInterval(async () => {
            await this.getActualMusic();
        }, 3000)
    }

    setActualMusic(music: IMusic) {
        this.actualMusic.next(music);
    }

    async previousMusic() {
        await this.spotifyService.getPreviousMusic();
    }

    async nextMusic() {
        await this.spotifyService.getNextMusic();
    }

}