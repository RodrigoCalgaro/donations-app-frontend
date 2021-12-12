import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { User } from 'src/app/modules/auth/interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user?: User;
  isAdmin = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser
    if (this.user && this.user.role == 'admin'){
      this.isAdmin = true
    }
  }

  logout(): void {
    this.authService.logout();
    this.user = undefined;
    this.isAdmin = false;
  }
}
