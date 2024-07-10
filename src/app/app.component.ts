import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  routeTransition,
  routeTransitionLogin,
} from './animations/route-transition';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [routeTransition, routeTransitionLogin],
})
export class AppComponent {
  title = 'clinica';

  prepareRoute(outlet: RouterOutlet) {
    const animation =
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation'];

    return animation || 'routeTransitionLogin';
  }
}
