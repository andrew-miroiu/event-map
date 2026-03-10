import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private mockUsers = [
    { email: 'test@test.com', password: '123456' },
    { email: 'admin@admin.com', password: 'admin123' }
  ];

  private loggedIn = signal<boolean>(this.loadFromStorage());
  private currentUser = signal<string | null>(localStorage.getItem('currentUser'));

  login(email: string, password: string): boolean {
    const user = this.mockUsers.find(
      u => u.email === email && u.password === password
    );
    if (user) {
      this.loggedIn.set(true);
      this.currentUser.set(email);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', email);
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn.set(false);
    this.currentUser.set(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  }

  register(email: string, password: string): boolean {
    if (this.mockUsers.some(u => u.email === email)) {
      return false;
    }
    this.mockUsers.push({ email, password });
    return true;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  private loadFromStorage(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}