import { IArtist } from "../interfaces/IArtist";
import { IMusic } from "../interfaces/IMusic";

export function newArtist(): IArtist {
    return {
        id: '',
        name: '',
        imageUrl: '',
    }
}

export function newMusic(): IMusic {
    return {
        id: '',
        album: {
            id: '',
            name: '',
            imageUrl: ''
        },
        artists: [],
        time: '',
        title: ''
    }
}