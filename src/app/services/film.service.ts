import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env";
import { FilmRequest } from "../models/film-request.model";
import { Film } from "../models/film.model";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response.model";
import { Genre } from "../models/genre.model";

@Injectable({
    providedIn: 'root'
})

export class FilmService {
    public apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getRandomFilm(filmRequest: FilmRequest) : Observable<ApiResponse<Film>> {
        return this.http.post<ApiResponse<Film>>(`${this.apiUrl}/v1/films`, filmRequest);
    }
}