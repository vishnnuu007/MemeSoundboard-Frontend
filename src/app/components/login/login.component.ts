import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  login(): void {

    if (!this.username.trim() || !this.password.trim()) {
      this.toastr.warning('Enter username and password');
      return;
    }

    this.loading = true;

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Welcome back!');
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error('Invalid username or password');
        console.log(err);
      }
    });
  }
}
