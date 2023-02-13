import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment'
import Spotify from 'spotify-web-api-js';
import { IUser } from '../interfaces/IUser';
import { spotifyArtistToArtist, spotifyPlaylistToPlaylist, spotifyTrackToMusic, spotifyUserToUser } from '../common/spotify-helper';
import { IPlaylist } from '../interfaces/IPlaylist';
import { Router } from '@angular/router';
import { IArtist } from '../interfaces/IArtist';
import { IMusic } from '../interfaces/IMusic';

@Injectable({ providedIn: 'root' })
export class SpotifyService {

    spotifyApi!: Spotify.SpotifyWebApiJs;
    user!: IUser;

    constructor(
        private router: Router
    ) {
        this.spotifyApi = new Spotify();
    }

    async initUser() {
        if (!!this.user)
            return true;

        const token = localStorage.getItem('token');

        if (!token)
            return false;

        try {
            this.setAccessToken(token);
            await this.getSpotifyUser()
            return !!this.user;

        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async getSpotifyUser() {
        const userInfo = await this.spotifyApi.getMe();
        this.user = spotifyUserToUser(userInfo);
    }

    getLoginUrl() {
        const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
        const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
        const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
        const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
        const responseType = `response_type=token&show_dialog=true`;
        return authEndpoint + clientId + redirectUrl + scopes + responseType;
    }

    getTokenFromUrlCallback() {
        if (!window.location.hash)
            return '';

        const params = window.location.hash.substring(1).split('&');

        return params[0].split('=')[1];
    }

    setAccessToken(token: string) {
        console.log(token);

        this.spotifyApi.setAccessToken(token);
        localStorage.setItem('token', token);
        // this.spotifyApi.skipToNext();
    }

    async getUserPlaylists(offset = 0, limit = 50): Promise<IPlaylist[]> {
        const playlists = await this.spotifyApi.getUserPlaylists(this.user.id, { offset, limit })

        return playlists.items.map(spotifyPlaylistToPlaylist);
    }

    async getTopArtists(limit = 10): Promise<IArtist[]> {
        const artists = await this.spotifyApi.getMyTopArtists({ limit })
        return artists.items.map(spotifyArtistToArtist)
    }

    async getSavedTracks(offset = 0, limit = 50): Promise<IMusic[]> {
        const musics = await this.spotifyApi.getMySavedTracks({ offset, limit });
        return musics.items.map(x => spotifyTrackToMusic(x.track));
    }

    async execMusic(musicId: string) {
        await this.spotifyApi.queue(musicId);
        await this.spotifyApi.skipToNext();
    }

    async getActualMusic(): Promise<IMusic> {
        const spotifyMusic = await this.spotifyApi.getMyCurrentPlayingTrack();
        return spotifyTrackToMusic(spotifyMusic.item);
    }

    async getPreviousMusic() {
        await this.spotifyApi.skipToPrevious();
    }

    async getNextMusic() {
        await this.spotifyApi.skipToNext();
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/login'])
    }
}