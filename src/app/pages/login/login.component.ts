import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})

export class LoginComponent implements OnInit {
    constructor(private spotifyService: SpotifyService, private router: Router) { }

    ngOnInit() {
        this.checkTokenFromUrlCallback();
    }

    checkTokenFromUrlCallback() {
        const token = this.spotifyService.getTokenFromUrlCallback();
        if (!!token) {
            this.spotifyService.setAccessToken(token);
            this.router.navigate(['/player/home'])
        }
    }

    loginOnSpotify() {
        window.location.href = this.spotifyService.getLoginUrl();
    }

    login() {
        this.router.navigate(['player/home'])
    }
}