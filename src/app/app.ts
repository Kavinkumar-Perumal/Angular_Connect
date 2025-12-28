import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Dashboard } from './dashboard/dashboard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    Dashboard
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  email: string | null = null;
  isCollapsed = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Initial load
    this.updateEmail();

    // Update email on every route change (login → dashboard)
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateEmail();
      });
  }

  updateEmail() {
    this.email = localStorage.getItem('loggedInUser');
  }

  toggleSidenav() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.email = null;
    this.router.navigate(['/login']);
  }

  showLayout() {
    return location.pathname !== '/login';
  }
}
