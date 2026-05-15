import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HasPermissionDirective } from '../../../core/directives/has-permission.directive';
import { ListarProductosComponent } from '../listar-productos/listar-productos.component';
import { ListarProductosInactivosComponent } from '../listar-productos-inactivos/listar-productos-inactivos.component';
import { CrearProductoComponent } from '../crear-producto/crear-producto.component';
import { AuthService } from '../../../core/auth/auth.service';

type ProductosTab = 'activos' | 'inactivos' | 'crear';

@Component({
  selector: 'app-pagina-productos',
  imports: [CommonModule, FormsModule, HasPermissionDirective, ListarProductosComponent, ListarProductosInactivosComponent, CrearProductoComponent],
  templateUrl: './pagina-productos.component.html',
  styleUrl: './pagina-productos.component.scss'
})
export class PaginaProductosComponent {
  private authService = inject(AuthService);

  activeTab: ProductosTab = 'activos';

  ngOnInit(): void {
    this.activeTab = this.obtenerPrimerTabDisponible();
  }

  seleccionarTab(tab: ProductosTab): void {
    if (!this.puedeVerTab(tab)) return;
    this.activeTab = tab;
  }

  puedeVerTab(tab: ProductosTab): boolean {
    switch (tab) {
      case 'activos':
        return this.authService.hasPermission('productos.activos.ver');

      case 'inactivos':
        return this.authService.hasPermission('productos.inactivos.ver');

      case 'crear':
        return this.authService.hasPermission('productos.crear');

      default:
        return false;
    }
  }

  private obtenerPrimerTabDisponible(): ProductosTab {
    if (this.puedeVerTab('activos')) return 'activos';
    if (this.puedeVerTab('inactivos')) return 'inactivos';
    if (this.puedeVerTab('crear')) return 'crear';

    return 'activos';
  }
}
