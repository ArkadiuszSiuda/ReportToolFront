import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserValidator } from '../validator/email.validator';
import { PasswordValidator } from '../validator/password.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = this.fb.group(
    {
      username: [
        '',
        [Validators.required, Validators.email],
        UserValidator.validate(this.userService),
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100),
          PasswordValidator.strong,
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [PasswordValidator.match('password', 'confirmPassword')],
    }
  );

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    const val = this.registerForm.value;
    this.userService
      .register({
        email: val.username!,
        password: val.password!,
        confirmPassword: this.registerForm.get('confirmPassword')?.value!,
      })
      .subscribe(() => {
        this.router.navigate(['/login']);
        this.snackBar.open('Account created!', 'X', {
          panelClass: 'notify-snackbar',
        });
      });
  }
}
