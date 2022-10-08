import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loading = false;
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    public loadingService: LoadingService
  ) {}

  onSubmit() {
    this.userService
      .login({
        email: this.loginForm.value.username!,
        password: this.loginForm.value.password!,
      })
      .subscribe(() => {
        this.router.navigate(['/timetable']);
      });
  }
}
