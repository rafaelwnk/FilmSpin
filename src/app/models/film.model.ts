import { Genre } from "./genre.model";

export class Film {
    id: number;
    title: string;
    genres: string[];
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average?: number;

    constructor(data: any, allGenres: Genre[]) {
        this.id = data.id;
        this.title = data.title || '';
        this.overview = data.overview || '';
        this.poster_path = data.poster_path || '';
        this.release_date = data.release_date || '';
        this.vote_average = data.vote_average;
        this.genres = allGenres
            .filter(g => data.genre_ids.includes(g.id))
            .map(g => g.name);
    }
}