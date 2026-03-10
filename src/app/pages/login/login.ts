import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage: string | null = null;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      return;
    }

    const { email, password } = this.loginForm.value;
    const success = this.authService.login(email!, password!);
    
    if (success) {
      this.router.navigate(['/']);
    } else {
      this.errorMessage = 'Invalid email or password.';
    }
  }

}
