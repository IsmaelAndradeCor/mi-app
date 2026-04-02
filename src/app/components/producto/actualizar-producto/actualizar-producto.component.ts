import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Para ngModel
import { ProductoDto } from '../../../models/producto.interface';
import { ProductoService } from '../../../services/producto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actualizar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar-producto.component.html',
  styleUrl: './actualizar-producto.component.scss'
})
export class ActualizarProductoComponent {

  constructor(
    private productoService: ProductoService,
    private toastrService: ToastrService
  ){}

  @Input() productoActualizar: ProductoDto | null = null;  // Quita required si inicializas
  @Input() mostrarActualizarProducto = false;

  @Output() cerrarModal = new EventEmitter<void>();  // ← Output correcto para cerrar

  cerrar() {
    this.cerrarModal.emit();  // Emite evento al padre
  }

  guardarCambios() {
    if (this.productoActualizar) {

      this.productoActualizar.precioCompra = Number(this.productoActualizar.precioCompra) || 0;
      this.productoActualizar.precioVenta = Number(this.productoActualizar.precioVenta) || 0;
      this.productoActualizar.stock = Number(this.productoActualizar.stock) || 0;
      this.productoActualizar.stockMinimo = Number(this.productoActualizar.stockMinimo) || 0;
      
      this.productoService.putProducto(
        this.productoActualizar.codigo!,
        this.productoActualizar
      ).subscribe({
        next: () => {
          this.toastrService.success('Producto actualizado correctamente.');
          this.cerrar();
        },
        error: (error) => {
          console.log(error);
          const errores = error?.error?.errors;

          if (errores) {
            Object.keys(errores).forEach(campo => {
              errores[campo].forEach((mensaje: string) => {
                this.toastrService.error(mensaje);
              });
            });
          } else {
            this.toastrService.error('Ocurrió un error al actualizar');
          }
        }
      });
    }
  }

}
