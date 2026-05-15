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
import { permissionGuard } from './core/auth/permission.guard';
import { SinAccesoComponent } from './components/sin-acceso/sin-acceso.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sin-acceso', component: SinAccesoComponent, canActivate: [authGuard] },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard, permissionGuard],
    data: { permissions: ['home.ver'] }
  },
  {
    path: 'producto/crear-producto',
    component: CrearProductoComponent,
    canActivate: [authGuard, permissionGuard],
    data: { permissions: ['productos.crear'] }
  },
  {
    path: 'producto/listar-productos',
    component: ListarProductosComponent,
    canActivate: [authGuard, permissionGuard],
    data: { permissions: ['productos.ver'] }
  },
  {
    path: 'venta/realizar-venta',
    component: RealizarVentaComponent,
    canActivate: [authGuard, permissionGuard],
    data: { permissions: ['ventas.realizar'] }
  },
  {
    path: 'venta/venta',
    component: VentaComponent,
    canActivate: [authGuard, permissionGuard],
    data: { permissions: ['ventas.historial.ver'] }
  },
  {
    path: 'marca/listar-marcas',
    component: ListarMarcasComponent,
    canActivate: [authGuard, permissionGuard],
    data: { permissions: ['marcas.ver'] }
  },
  {
    path: 'categoria/listar-categorias',
    component: ListarCategoriaComponent,
    canActivate: [authGuard, permissionGuard],
    data: { permissions: ['categorias.ver'] }
  },
  {
    path: 'unidadMedida/listar-unidades-medida',
    component: ListarUnidadesMedidaComponent,
    canActivate: [authGuard, permissionGuard],
    data: { permissions: ['unidadesmedida.ver'] }
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];