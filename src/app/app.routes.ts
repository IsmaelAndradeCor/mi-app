import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListarProductosComponent } from './components/producto/listar-productos/listar-productos.component';
import { ActualizarProductoComponent } from './components/producto/actualizar-producto/actualizar-producto.component';
import { CrearProductoComponent } from './components/producto/crear-producto/crear-producto.component';
import { RealizarVentaComponent } from './components/venta/realizar-venta/realizar-venta.component';
import { CrearMarcaComponent } from './components/marca/crear-marca/crear-marca.component';
import { ListarMarcasComponent } from './components/marca/listar-marcas/listar-marcas.component';
import { VentaComponent } from './components/venta/venta/venta.component';
import { pinGuard } from './guard/pin.guard';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    // {path: 'producto/actualizar-producto', component: ActualizarProductoComponent},
    // Productos
    {path: 'producto/crear-producto', component: CrearProductoComponent},
    // {path: 'producto/eliminar-producto', component: EliminarProductoComponent},
    {path: 'producto/listar-productos', component: ListarProductosComponent},

    // Ventas
    {path: 'venta/realizar-venta', component: RealizarVentaComponent},
    {path: 'venta/venta', component: VentaComponent, canActivate:[pinGuard]},
    // Marcas
    // {path: 'marca/crear-marca', component: CrearMarcaComponent},
    {path: 'marca/listar-marcas', component: ListarMarcasComponent},

    // Redirecciones al final
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }
];
