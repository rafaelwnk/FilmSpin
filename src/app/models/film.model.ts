import { Genre } from "./genre.model";

export interface Film {
    id: number,
    title: string,
    genres: Genre[],
    genresString: string,
    overview: string,
    poster_path: string,
    release_date: string,
    vote_average: number
}