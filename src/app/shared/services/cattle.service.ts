import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import {Cattle} from '@models/cattle.interface';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CattleService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiBaseLink + '/cattle';

  getCattle(): Observable<Cattle[]> {
    return this.http.get<Cattle[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getCattleById(id: number): Observable<Cattle> {
    return this.http.get<Cattle>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addCattle(cattle: Cattle): Observable<Cattle> {
    return this.http.post<Cattle>(this.apiUrl, cattle).pipe(
      catchError(this.handleError)
    );
  }

  updateCattle(id: number, changes: Partial<Cattle>): Observable<Cattle> {
    return this.http.patch<Cattle>(`${this.apiUrl}/${id}`, changes).pipe(
      catchError(this.handleError)
    );
  }

  deleteCattle(id: number): Observable<Cattle> {
    return this.http.delete<Cattle>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateAvailability(id: number, available: boolean): Observable<Cattle> {
    return this.updateCattle(id, { available });
  }


  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(() => new Error(error.message || 'Something went wrong. Please try again.'));
  }
}
