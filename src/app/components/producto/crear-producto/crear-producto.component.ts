import { Component } from '@angular/core';
import { ProductoDto } from '../../../models/producto.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../../services/producto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-producto',
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.scss'
})
export class CrearProductoComponent {

  constructor(
    private productoService: ProductoService,
    private toastrService: ToastrService
  ){}

  producto: ProductoDto = {
    id: 0,
    codigo: '',
    nombre: '',
    descripcion: '',
    precioCompra: 0,
    precioVenta: 0,
    stock: 0,
    stockMinimo: 0,
    categoria: '',
    proveedor: ''
  };

  agregarProducto(): void {
    this.productoService.postProducto(this.producto).subscribe({
      next:() => {
        this.toastrService.success('Producto creado correctamente');
        this.producto = {
                          id: 0,
                          codigo: '',
                          nombre: '',
                          descripcion: '',
                          precioCompra: 0,
                          precioVenta: 0,
                          stock: 0,
                          stockMinimo: 0,
                          categoria: '',
                          proveedor: ''
                        };
      },
      error:(err) => {
      if (err.status === 400) {
        console.error(err.error.mensaje);
      } else if (err.status === 500) {
        console.error('Error interno del servidor: ' + err.error);
      } else if (err.status === 0) {
        console.error('No se pudo conectar con el servidor');
      } else {
        console.error('Ocurrió un error inesperado');
      }
      
      this.toastrService.error(err.error.mensaje);
      }
    });
  }

}
