import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userName = '';
  password = '';
  cargando = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  iniciarSesion(): void {
    if (!this.userName.trim() || !this.password.trim()) {
      this.toastrService.warning('Usuario y contraseña son obligatorios.');
      return;
    }

    this.cargando = true;

    this.authService.login({
      userName: this.userName,
      password: this.password
    }).subscribe({
      next: (response) => {
        this.cargando = false;

        if (response.roles.includes('Administrador')) {
          this.router.navigate(['/home']);
          return;
        }

        this.router.navigate(['/venta/realizar-venta']);
      },
      error: () => {
        this.cargando = false;
        this.toastrService.error('Credenciales inválidas.');
      }
    });
  }
}