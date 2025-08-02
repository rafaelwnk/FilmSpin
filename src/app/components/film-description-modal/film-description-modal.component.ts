import { Component, DestroyRef, inject, Input } from '@angular/core';
import { Film } from '../../models/film.model';
import { CommonModule } from '@angular/common';

declare var UIkit: any;

@Component({
  selector: 'app-film-description-modal',
  imports: [CommonModule],
  templateUrl: './film-description-modal.component.html'
})
export class FilmDescriptionModalComponent {
  @Input() film!: Film;

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.destroyModal();
    });
  }

  destroyModal() {
    const modal = document.getElementById('film-description-modal');
    if (modal) {
      UIkit.modal(modal).hide();
      modal.remove();
    }
  }
}
