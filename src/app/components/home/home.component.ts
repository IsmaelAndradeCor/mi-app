import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { VentaService } from '../../services/venta.service';
import { GenerarVentasDTO } from '../../models/generar-ventas-dto';
import { ProductoResponseDto } from '../../models/dtos/responses/producto-response-dto';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(
    private productoService: ProductoService,
    private ventaService: VentaService
  ) {}

  productos: ProductoResponseDto[] = [];
  ventas: GenerarVentasDTO [] = [];

  ngOnInit(): void {
    this.getProductosStockMinimo();
    this.getGenerarVenta();
  }

  getProductosStockMinimo(): void {
    this.productoService.getProductosStockMinimo().subscribe({
      next:(res) => {
        this.productos = res;
      }
    });
  }

  getGenerarVenta(): void {
    this.ventaService.getGenerarVentas().subscribe({
      next:(res) => {
        this.ventas = res;
      }
    });
  }

  calcularTotalGanancias(): number {
    console.log('calcularTotalGanancias()');
    return this.ventas.reduce((total, item) => 
      total + (item.ganancias), 0
    );
  }

}
