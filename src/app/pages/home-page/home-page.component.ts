import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilmService } from '../../services/film.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { map, Observable, switchMap } from 'rxjs';
import { Film } from '../../models/film.model';
import { HistoryUtil } from '../../utils/history.util';
import { FilmDescriptionModalComponent } from "../../components/film-description-modal/film-description-modal.component";
import { ApiResponse } from '../../models/api-response.model';

@Component({
  selector: 'app-home-page',
  imports: [RouterModule, ReactiveFormsModule, CommonModule, FilmDescriptionModalComponent],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
  public film?: Film;
  public form: FormGroup = new FormGroup({
    genre: new FormControl<string>('', [Validators.required]),
    decade: new FormControl<string>('', [Validators.required]),
    rating: new FormControl<string>('', [Validators.required])
  })
  public errorMessage!: string;
  public interactionPending = true;
  public hasError = false;
  public busy = false;

  constructor(private service: FilmService) { }

  submit() {
    this.busy = true;
    this.interactionPending = false;
    this.service.getRandomFilm(this.form.value)
      .subscribe({
        next: (response: ApiResponse<Film>) => {
          this.film = response.data;
          this.film.genresDisplayText = this.film.genres.map(x => x.name).join(', ')
          this.hasError = false;
          HistoryUtil.add(this.film);
          this.busy = false;
        },
        error: (err: any) => {
          this.hasError = true;
          this.film = undefined;
          this.errorMessage = err.error.message;
          this.busy = false;
        }
      })
  }
}
