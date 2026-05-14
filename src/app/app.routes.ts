import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListarProductosComponent } from './components/producto/listar-productos/listar-productos.component';
import { CrearProductoComponent } from './components/producto/crear-producto/crear-producto.component';
import { RealizarVentaComponent } from './components/venta/realizar-venta/realizar-venta.component';
import { ListarMarcasComponent } from './components/marca/listar-marcas/listar-marcas.component';
import { VentaComponent } from './components/venta/venta/venta.component';
import { ListarCategoriaComponent } from './components/categoria/listar-categorias/listar-categorias.component';
import { ListarUnidadesMedidaComponent } from './components/unidadMedida/listar-unidades-medida/listar-unidades-medida.component';
import { LoginComponent } from './components/auth/login/login.component';
import { authGuard } from './core/auth/auth.guard';
import { roleGuard } from './core/auth/role.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Administrador', 'Empleado'] }
  },
  {
    path: 'producto/crear-producto',
    component: CrearProductoComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Administrador'] }
  },
  {
    path: 'producto/listar-productos',
    component: ListarProductosComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Administrador'] }
  },
  {
    path: 'venta/realizar-venta',
    component: RealizarVentaComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Administrador', 'Empleado'] }
  },
  {
    path: 'venta/venta',
    component: VentaComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Administrador'] }
  },
  {
    path: 'marca/listar-marcas',
    component: ListarMarcasComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Administrador'] }
  },
  {
    path: 'categoria/listar-categorias',
    component: ListarCategoriaComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Administrador'] }
  },
  {
    path: 'unidadMedida/listar-unidades-medida',
    component: ListarUnidadesMedidaComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Administrador'] }
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];