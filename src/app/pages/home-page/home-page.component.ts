import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilmService } from '../../services/film.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { map, Observable, pipe, switchMap } from 'rxjs';
import { Film } from '../../models/film.model';
import { HistoryUtil } from '../../utils/history.util';

@Component({
  selector: 'app-home-page',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
  public film$!: Observable<Film>;
  public form: FormGroup = new FormGroup({
    genre: new FormControl<string>('', [Validators.required]),
    decade: new FormControl<string>('', [Validators.required]),
    rating: new FormControl<string>('', [Validators.required])
  })
  public interactionPending = true;
  public isUndefined = false;

  constructor(private service: FilmService) { }

  submit() {
    this.interactionPending = false;
    this.film$ = this.service.getPages(this.form.value).pipe(
      switchMap((response: any) => {
        let page;
        if (response.total_pages > 500)
          page = Math.floor(Math.random() * 500) + 1;
        else
          page = Math.floor(Math.random() * response.total_pages) + 1;
        return this.service.getRandomFilm(this.form.value, page);
      }),
      switchMap((response: any) => {
        const indexFilm = Math.floor(Math.random() * response.results.length);
        const selectedFilm = response.results[indexFilm];
        this.isUndefined = !selectedFilm;
        return this.service.getGenres().pipe(
          map((response: any) => {
            let film = new Film(selectedFilm, response.genres)
            if (!this.isUndefined)
              HistoryUtil.add(film);
            return film;
          })
        );
      })
    );
  }
}
