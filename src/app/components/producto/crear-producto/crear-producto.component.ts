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
      error:() => {
        this.toastrService.error('Ocurrió un error al intentar crear un producto');
      }
    });
  }

}
