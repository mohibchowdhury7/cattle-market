import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from '@core/components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: `
    main {
      padding: 0;
      min-height: calc(100vh - 64px);
    }
  `
})
export class AppComponent {
  title = 'cattle-market';
}
