import { Component, OnInit } from '@angular/core';
import { ProductoDto } from '../../../models/producto.interface';
import { ActualizarProductoComponent } from '../actualizar-producto/actualizar-producto.component';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../../services/producto.service';

// // Simular API
// const fetchProductos = async (): Promise<Producto[]> => {
//   return new Promise(resolve => setTimeout(() => resolve(productosMock), 500));
// };

@Component({
  selector: 'app-listar-productos',
  imports: [CommonModule ,ActualizarProductoComponent],
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.scss'
})

export class ListarProductosComponent implements OnInit {

  constructor(
    private productoService: ProductoService
  ){}

  productosDto: ProductoDto[] = [];
  productoActualizar: ProductoDto | null = null;;
  mostrarActualizarProducto: boolean = false;

  productosPorCodigo: Map<string, ProductoDto> = new Map();  // ← Tu diccionario
  
  ngOnInit() {
    // Convierte el arreglo a Map UNA SOLA VEZ al cargar

    this.productoService.getProductos().subscribe({
      next:(prodcutosResponse) => {
        this.productosDto = prodcutosResponse;

        this.productosPorCodigo = new Map(
          this.productosDto.map(producto => [producto.codigo, producto])
        );
        
        console.log('Map creado con', this.productosPorCodigo.size, 'productos');
      }
    });
  }

  eliminarProductoPorCodigo(codigo: string): void {

    this.productoService.deleteProducto(codigo).subscribe({
      next:() => {
        // 1. Eliminar del Map (rápido)
        this.productosPorCodigo.delete(codigo);

        // 2. Recrear el array sin ese producto
        this.productosDto = this.productosDto.filter(x => x.codigo !== codigo);
      },
      error: (error) => {
        console.error('Error eliminando producto:', error);
      }
    });
    console.log('Producto Eliminado');
  }

  abrirModalActualizarProductoPorCodigo(codigo: string): void {
    // Llama al servicio en lugar de find()
    this.productoService.getProductoPorCodigo(codigo).subscribe({
      next: (producto) => {
        this.productoActualizar = producto;
        this.mostrarActualizarProducto = true;
      },
      error: (error) => {
        console.error('Error obteniendo producto:', error);
      }
    });
  }

  cerrarModal(): void {
    this.mostrarActualizarProducto = false;
    this.productoActualizar = null;
  }

}
