import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-shell',
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatProgressBarModule
  ],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss'
})
export class AppShellComponent {

}
