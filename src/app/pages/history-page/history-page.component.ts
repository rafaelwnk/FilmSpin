import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Film } from '../../models/film.model';
import { HistoryUtil } from '../../utils/history.util';
import { CommonModule } from '@angular/common';
import { FilmDescriptionModalComponent } from "../../components/film-description-modal/film-description-modal.component";

@Component({
  selector: 'app-history-page',
  imports: [RouterModule, CommonModule, FilmDescriptionModalComponent],
  templateUrl: './history-page.component.html'
})
export class HistoryPageComponent {
  public films!: Film[];
  public selectedFilm!: Film;

  ngOnInit() {
    this.films = HistoryUtil.get().reverse();
  }

  openModal(film: Film) {
    this.selectedFilm = film;
  }
}
