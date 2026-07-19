import { Component } from '@angular/core';
import { trigger, transition, style, animate, query } from '@angular/animations';
import { Router } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnim', [
      transition('* <=> *', [
        query(':enter', [style({ opacity: 0, transform: 'translateY(12px)' })], { optional: true }),
        query(':leave', [style({ position: 'absolute', width: '100%' })], { optional: true }),
        query(':enter', [
          animate('280ms cubic-bezier(.4,0,.2,1)', style({ opacity: 1, transform: 'translateY(0)' }))
        ], { optional: true })
      ])
    ])
  ]
})
export class AppComponent {

  mobileMenuOpen = false;

  constructor(
    public themeService: ThemeService,
    public authService: AuthService,
    private router: Router
  ) { }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  prepareRoute(outlet: any) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
