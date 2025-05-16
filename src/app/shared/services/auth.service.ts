import {Injectable, inject, afterNextRender} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {User} from '@models/user.interface';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiBaseLink;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Check if user is already logged in
    afterNextRender({
      write : () => {
        const user = localStorage.getItem(environment.currentUser);
        if (user) {
          this.currentUserSubject.next(JSON.parse(user));
        }
      },
    })
  }

  login(username: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.apiUrl}/users`, {
      params: { username, password }
    }).pipe(
      map(users => {
        // Check if user exists and credentials match
        const user = users[0];
        if (user) {
          // Store user details and token in local storage
          localStorage.setItem(environment.currentUser, JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }
        throw new Error('Invalid username or password');
      })
    );
  }

  logout(): void {
    // Remove user from local storage
    localStorage.removeItem(environment.currentUser);
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  getToken(): string | undefined | null {
    const currentUser = this.currentUserSubject.value;
    return currentUser ? currentUser.token : null;
  }
}
