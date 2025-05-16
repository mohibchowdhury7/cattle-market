import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {CattleService} from '@shared/services';

@Component({
  selector: 'app-add-cattle',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  templateUrl: './add-cattle.component.html',
  styleUrl: './add-cattle.component.scss'
})
export class AddCattleComponent implements OnInit{
  private fb = inject(FormBuilder);
  private cattleService = inject(CattleService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);



  isSubmitting = false;
  cattleId: number | null = null;

  cattleForm: FormGroup = this.fb.group({
    breed: ['', Validators.required],
    weight: [null, [Validators.required, Validators.min(1)]],
    price: [null, [Validators.required, Validators.min(1)]],
    available: [true]
  });

  get weight() {
    return this.cattleForm.get('weight') as FormControl;
  }
  get price() {
    return this.cattleForm.get('price') as FormControl;
  }
  get breed() {
    return this.cattleForm.get('breed') as FormControl;
  }
  get available() {
    return this.cattleForm.get('available') as FormControl;
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.cattleId = params['id'];
      if (this.cattleId) {
        this.getCattleById(this.cattleId);
      }
    });
  }

  getCattleById(id: number): void {
    this.cattleService.getCattleById(id).subscribe({
      next: (cattle) => {
        this.cattleForm.patchValue(cattle);
      },
      error: (err) => {
        this.snackBar.open(`Failed to load cattle: ${err.message}`, 'Close', {
          duration: 3000
        });
      }
    });
  }

  onSubmit(): void {
    if (this.cattleForm.invalid) {
      this.snackBar.open('Please fill in all required fields', 'Close', {
        duration: 3000
      });
      return;
    }

    this.isSubmitting = true;

    if (this.cattleId) {
      this.editCattle();
    } else {
      this.addCattle();
    }

  }

  addCattle(): void {
    this.cattleService.addCattle(this.cattleForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.snackBar.open('Cattle added successfully', 'Close', {
          duration: 3000
        });
        this.router.navigate(['/cattle']);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.snackBar.open(`Failed to add cattle: ${err.message}`, 'Close', {
          duration: 3000
        });
      }
    });
  }

  editCattle(): void {
    if (this.cattleId) {
      this.cattleService.updateCattle(this.cattleId, this.cattleForm.value).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.snackBar.open('Cattle updated successfully', 'Close', {
            duration: 3000
          });
          this.router.navigate(['/cattle']);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.snackBar.open(`Failed to update cattle: ${err.message}`, 'Close', {
            duration: 3000
          });
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/cattle']);
  }
}
