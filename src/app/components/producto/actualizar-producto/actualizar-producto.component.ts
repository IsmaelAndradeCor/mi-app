import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Para ngModel
import { ProductoDto } from '../../../models/producto.interface';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-actualizar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar-producto.component.html',
  styleUrl: './actualizar-producto.component.scss'
})
export class ActualizarProductoComponent {

  constructor(private productoService: ProductoService){}

  @Input() productoActualizar: ProductoDto | null = null;  // Quita required si inicializas
  @Input() mostrarActualizarProducto = false;

  @Output() cerrarModal = new EventEmitter<void>();  // ← Output correcto para cerrar

  cerrar() {
    this.cerrarModal.emit();  // Emite evento al padre
  }

  guardarCambios() {
    if (this.productoActualizar) {
      // Llama al servicio PUT
      this.productoService.putProducto(
        this.productoActualizar.codigo!, 
        this.productoActualizar
      ).subscribe({
        next: () => {
          console.log('Producto actualizado');
          this.cerrar();
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }
  }

}
