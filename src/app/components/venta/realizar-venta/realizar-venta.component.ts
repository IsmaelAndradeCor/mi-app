import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { ProductoDto } from '../../../models/producto.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-realizar-venta',
  imports: [CommonModule, FormsModule],
  templateUrl: './realizar-venta.component.html',
  styleUrl: './realizar-venta.component.scss'
})
export class RealizarVentaComponent implements OnInit {

  constructor(
    private productoService: ProductoService
  ){}

  productosDto: ProductoDto[] = [];
  productosPorCodigo: Map<string, ProductoDto> = new Map();  // ← Tu diccionario
  
  codigoProducto: string = '';

  // carrito: ProductoDto[] = [];
  // Propiedad del carrito
  carrito: ItemCarrito[] = [];

  ngOnInit() {
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

  agregarProductoPorCodigo() {
    if (this.codigoProducto && this.productosPorCodigo.has(this.codigoProducto)) {
      const producto = this.productosPorCodigo.get(this.codigoProducto)!;
      // Agregar al carrito
      this.agregarAlCarrito(producto);
    } else {
      alert('Producto no encontrado');
    }
    // Limpiar input para próximo escaneo
    this.codigoProducto = '';
  }

  // Función corregida ✅
  agregarAlCarrito(producto: ProductoDto) {
    const itemExistente = this.carrito.find(item => 
      item.producto.codigo === producto.codigo  // Ahora existe producto.codigo
    );
    
    if (itemExistente) {
      itemExistente.cantidad++;  // ✅ itemExistente tiene cantidad
    } else {
      this.carrito.push({ 
        producto, 
        cantidad: 1 
      });  // ✅ Crea ItemCarrito
    }
    
    // this.calcularTotal();  // Actualizar totales
  }

  quitarItem(index: number) {
    this.carrito.splice(index, 1);
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, item) => 
      total + (item.cantidad * item.producto.precioVenta), 0
    );
  }
}

export interface ItemCarrito {
  producto: ProductoDto;
  cantidad: number;
}