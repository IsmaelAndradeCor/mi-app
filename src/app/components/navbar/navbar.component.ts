import { Component, computed } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';

interface NavItem {
  label: string;
  route: string;
  roles: string[];
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {


  navItems: NavItem[] = [
    { label: 'Inicio', route: '/home', roles: ['Administrador', 'Empleado'] },
    { label: 'Venta', route: '/venta/realizar-venta', roles: ['Administrador', 'Empleado'] },
    { label: 'Productos', route: '/producto/listar-productos', roles: ['Administrador'] },
    { label: 'Marcas', route: '/marca/listar-marcas', roles: ['Administrador'] },
    { label: 'Categorias', route: '/categoria/listar-categorias', roles: ['Administrador'] },
    { label: 'Unidades Medida', route: '/unidadMedida/listar-unidades-medida', roles: ['Administrador'] },
    { label: 'Historial Ventas', route: '/venta/venta', roles: ['Administrador'] }
  ];

  visibleNavItems = computed(() => {
    const userRoles = this.authService.roles();
    return this.navItems.filter(item =>
      item.roles.some(role => userRoles.includes(role))
    );
  });

  constructor(
    public themeService: ThemeService,
    public authService: AuthService,
    private router: Router
  ) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  esAdmin(): boolean {
    console.log(this.authService)
    return this.authService.hasRole('Administrador');
  }
}
