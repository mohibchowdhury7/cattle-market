import {Component, inject, OnInit} from '@angular/core';
import {CommonModule, CurrencyPipe} from "@angular/common";
import {Router} from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltip} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {CattleService} from '@shared/services';
import {AvailabilityStatusPipe, WeightPipe} from '@shared/pipes';
import {AppShellComponent} from '@core/components';
import {Cattle} from '@models/cattle.interface';

@Component({
  selector: 'app-cattle-list',
    imports: [
      CommonModule,
      MatTableModule,
      MatButtonModule,
      MatIconModule,
      MatCardModule,
      MatProgressSpinnerModule,
      MatChipsModule,
      MatSnackBarModule,
      CurrencyPipe,
      WeightPipe,
      AvailabilityStatusPipe,
      MatTooltip,
      AppShellComponent
    ],
  templateUrl: './cattle-list.component.html',
  styleUrl: './cattle-list.component.scss'
})
export class CattleListComponent implements OnInit{
  private cattleService = inject(CattleService);
  protected router = inject(Router);
  private snackBar = inject(MatSnackBar);

  cattle: Cattle[] = [];
  isLoading = false;
  error = '';
  displayedColumns: string[] = ['id', 'breed', 'weight', 'price', 'status', 'actions'];

  ngOnInit(): void {
    this.loadCattle();
  }

  loadCattle(): void {
    this.isLoading = true;
    this.error = '';

    this.cattleService.getCattle().subscribe({
      next: (data) => {
        this.cattle = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load cattle.';
        this.isLoading = false;
      }
    });
  }

  toggleAvailability(cattle: Cattle): void {
    if (!cattle.id) return;

    const newStatus = !cattle.available;
    const statusText = newStatus ? 'available' : 'sold';

    this.cattleService.updateAvailability(cattle.id, newStatus).subscribe({
      next: (updatedCattle) => {
        const index = this.cattle.findIndex(c => c.id === cattle.id);
        if (index !== -1) {
          this.cattle[index] = updatedCattle;
          cattle.available = newStatus;
        }

        this.snackBar.open(`Cattle marked as ${statusText}`, 'Close', {
          duration: 3000
        });
      },
      error: (err) => {
        this.snackBar.open(`Failed to update status: ${err.message}`, 'Close', {
          duration: 3000
        });
      }
    });
  }

  deleteCattle(id: number): void {
    this.cattleService.deleteCattle(id).subscribe({
      next: () => {
        this.cattle = this.cattle.filter(c => c.id !== id);
        this.snackBar.open('Cattle deleted successfully', 'Close', {
          duration: 3000
        });
      },
      error: (err) => {
        this.snackBar.open(`Failed to delete cattle: ${err.message}`, 'Close', {
          duration: 3000
        });
      }
    });
  }

  addNewCattle(): void {
    this.router.navigate(['/cattle/add']);
  }
}
