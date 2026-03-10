import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { mismatch: true };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router)

  errorMessage : string | null = null;
  
  signupForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: passwordsMatch });

  onSubmit() {
    if(this.signupForm.invalid){
      this.errorMessage = 'Please fill in all fields correctly';
      return;
    }

    const {email, password} = this.signupForm.value;
    const success = this.authService.register(email!, password!);

    if(success){
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }
}
