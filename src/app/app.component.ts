import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { HistoryPageComponent } from "./pages/history-page/history-page.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomePageComponent, HistoryPageComponent],
  template: '<app-home-page>'
})
export class AppComponent {

}
