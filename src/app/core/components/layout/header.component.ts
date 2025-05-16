import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {AuthService} from '@shared/services';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Cattle Market</span>
      <span class="spacer"></span>

      @if (authService.currentUser$ | async) {
        <button mat-button routerLink="/cattle">
          <mat-icon>list</mat-icon> Cattle List
        </button>
        <button mat-button routerLink="/cattle/add">
          <mat-icon>add</mat-icon> Add Cattle
        </button>
        <button mat-button (click)="logout()">
          <mat-icon>exit_to_app</mat-icon> Logout
        </button>
      }
    </mat-toolbar>
  `,
  styles: `
    .spacer {
      flex: 1 1 auto;
    }

    button {
      margin-left: 8px;
    }
  `
})
export class HeaderComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
