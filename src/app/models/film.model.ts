import { Genre } from "./genre.model";

export interface Film {
    id: number,
    title: string,
    genres: Genre[],
    genresDisplayText: string,
    overview: string,
    posterPath: string,
    releaseYear: string,
    voteAverage: number
}