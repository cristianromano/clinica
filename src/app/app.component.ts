import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeTransition } from './animations/route-transition';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [routeTransition],
})
export class AppComponent {
  title = 'clinica';

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
