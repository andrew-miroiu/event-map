import { Component, inject, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private authService = inject(AuthService);

  @Output() search = new EventEmitter<string>();

  username = this.authService.getCurrentUser();

  logout() {
    this.authService.logout();
  }
}
