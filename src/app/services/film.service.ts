import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env";
import { FilmRequest } from "../models/film-request.model";

@Injectable({
    providedIn: 'root'
})

export class FilmService {
    public url = "https://api.themoviedb.org/3/discover/movie";
    public genreUrl = "https://api.themoviedb.org/3/genre/movie/list?language=pt-BR";
    public apiKey = environment.tmdbKey;

    constructor(private http: HttpClient) { }

    public composeHeaders() {
        const headers = new HttpHeaders().set('Authorization', `bearer ${this.apiKey}`);
        return headers;
    }

    getRandomFilm(filmRequest: FilmRequest, page: number) {
        if (filmRequest.decade == '') {
            return this.http.get(`${this.url}?language=pt-BR&vote_average.gte=${filmRequest.rating}&with_genres=${filmRequest.genre}&vote_count.gte=250&page=${page}`, { headers: this.composeHeaders() });
        }
        return this.http.get(`${this.url}?language=pt-BR&primary_release_date.gte=${filmRequest.decade}-01-01&primary_release_date.lte=${Number(filmRequest.decade) + 9}-12-31&vote_average.gte=${filmRequest.rating}&with_genres=${filmRequest.genre}&vote_count.gte=250&page=${page}`, { headers: this.composeHeaders() });
    }

    getPages(filmRequest: FilmRequest) {
        if (filmRequest.decade == '') {
            return this.http.get(`${this.url}?language=pt-BR&vote_average.gte=${filmRequest.rating}&with_genres=${filmRequest.genre}&vote_count.gte=250`, { headers: this.composeHeaders() });
        }
        return this.http.get(`${this.url}?language=pt-BR&primary_release_date.gte=${filmRequest.decade}-01-01&primary_release_date.lte=${Number(filmRequest.decade) + 9}-12-31&vote_average.gte=${filmRequest.rating}&with_genres=${filmRequest.genre}}&vote_count.gte=250`, { headers: this.composeHeaders() });
    }

    getGenres() {
        return this.http.get(this.genreUrl, { headers: this.composeHeaders() });
    }
}