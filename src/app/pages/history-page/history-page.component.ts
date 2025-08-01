import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Film } from '../../models/film.model';
import { HistoryUtil } from '../../utils/history.util';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-page',
  imports: [RouterModule, CommonModule],
  templateUrl: './history-page.component.html'
})
export class HistoryPageComponent {
  public films!: Film[];

  ngOnInit() {
    this.films = [...HistoryUtil.get()].reverse();
  }
}
