import { addMilliseconds, format } from "date-fns";
import { IArtist } from "../interfaces/IArtist";
import { IMusic } from "../interfaces/IMusic";
import { IPlaylist } from "../interfaces/IPlaylist";
import { IUser } from "../interfaces/IUser";

export function spotifyUserToUser(user: SpotifyApi.CurrentUsersProfileResponse): IUser {
    return {
        id: user.id,
        name: user.display_name,
        imageUrl: user.images?.pop()?.url
    }
}

export function spotifyPlaylistToPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {
    return {
        id: playlist.id,
        name: playlist.name,
        imageUrl: playlist.images.pop().url
    }
}

export function spotifyArtistToArtist(artist: SpotifyApi.ArtistObjectFull): IArtist {
    return {
        id: artist.id,
        name: artist.name,
        imageUrl: artist.images.sort((a, b) => a.width - b.width).pop().url,
    }
}

export function spotifyTrackToMusic(track: SpotifyApi.TrackObjectFull): IMusic {
    const msToMinits = (ms: number) => {
        const date = addMilliseconds(new Date(0), ms);
        return format(date, 'mm:ss');
    }

    return {
        id: track.uri,
        title: track.name,
        album: {
            id: track.album.id,
            name: track.album.name,
            imageUrl: track.album.images.shift().url
        },
        artists: track.artists.map(art => ({
            id: art.id,
            name: art.name
        })),
        time: msToMinits(track.duration_ms)
    }
}