import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from './auth/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn = false;
  isAdmin = false;

  constructor(private userService: UserService) {
    this.userService.isLoggedIn().subscribe((val) => {
      this.isLoggedIn = val;
    });
    this.userService.hasAdminRole().subscribe((val) => {
      this.isAdmin = val;
    });
  }

  logout() {
    this.userService.logout();
  }
}
