import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { ProductoDto } from '../../../models/producto.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetalleVentaDto } from '../../../models/detalle-venta';
import { VentaDto } from '../../../models/venta';
import { VentaService } from '../../../services/venta.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-realizar-venta',
  imports: [CommonModule, FormsModule],
  templateUrl: './realizar-venta.component.html',
  styleUrl: './realizar-venta.component.scss'
})
export class RealizarVentaComponent implements OnInit {

  @ViewChild('inputCodigo') inputCodigo!: ElementRef<HTMLInputElement>;
  @ViewChild('inputCambio') inputCambio!: ElementRef<HTMLInputElement>;
  // @ViewChild('buttonRealizarVenta') buttonRealizarVenta!: ElementRef<HTMLInputElement>;

  constructor(
    private productoService: ProductoService,
    private ventaService: VentaService,
    private toastrService: ToastrService
  ){}

  productosDto: ProductoDto[] = [];
  productosPorCodigo: Map<string, ProductoDto> = new Map();  // ← Tu diccionario
  
  codigoProducto: string = '';
  dineroRecibido: number = 0;
  // cambioDar: number = 0;

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

  ngAfterViewInit() {
    this.enfocarInputCodigo();
  }

  @HostListener('document:keydown.escape', ['$event'])
  manejarTeclaEsc(event: Event) {
    event.preventDefault();
    this.enfocarInputCodigo();
  }

  enfocarInputCodigo() {
    setTimeout(() => {
      this.inputCodigo?.nativeElement.focus();
      this.inputCodigo?.nativeElement.select();
    }, 0);
  }

  @HostListener('document:keydown.tab', ['$event'])
  manejarTeclaTab(event: Event) {
    event.preventDefault();
    this.enfocarInputCambio();
  }

  enfocarInputCambio() {
    setTimeout(() => {
      this.inputCambio?.nativeElement.focus();
      this.inputCambio?.nativeElement.select();
    }, 0);
  }

  @HostListener('document:keydown.control.enter', ['$event'])
  manejarTeclaIntro(event: Event) {
    event.preventDefault();
    this.finalizarVenta();
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
    this.enfocarInputCodigo();
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

  disminuirCantidad(index: number) {
    const item = this.carrito[index];

    if (!item) return;

    if (item.cantidad > 1) {
      item.cantidad--;
    } else {
      this.carrito.splice(index, 1);
    }

    this.enfocarInputCodigo();
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, item) => 
      total + (item.cantidad * item.producto.precioVenta), 0
    );
  }

  calcularCambio(): number {
    const totalVenta = this.calcularTotal();

    return this.dineroRecibido - totalVenta;
  }

  private generarFolio(): string {
    const año = new Date().getFullYear();
    const clave = `folio_${año}`;
    
    // Obtener contador actual o inicializar en 1
    let contador = parseInt(localStorage.getItem(clave) || '0') + 1;
    
    // Guardar para próxima vez
    localStorage.setItem(clave, contador.toString());
    
    // Formatear con 4 dígitos (0001, 0002, etc.)
    const numeroFormateado = contador.toString().padStart(4, '0');
    
    return `FOL-${año}-${numeroFormateado}`;
  }

  finalizarVenta() {
    const venta: VentaDto = {
      folio: this.generarFolio(),
      total: this.calcularTotal(),
      detalles: this.carrito.map(item => ({
        idProducto: item.producto.id,
        codigo: item.producto.codigo,
        nombre: item.producto.nombre,
        cantidad: item.cantidad,
        precio: item.producto.precioVenta
      }))
    };

    this.ventaService.registrarVenta(venta).subscribe({
      next:(idVenta) => {
        // console.log('Venta #' + idVenta + ' registrada exitosamente');
        this.toastrService.success('Venta registrada con éxito!','Éxito!')
        this.carrito = [];
        this.codigoProducto = '';
        this.enfocarInputCodigo();
        this.dineroRecibido = 0;
      },
      error:(error) => {
        this.toastrService.warning('Ocurrió un error, por favor contacta al administrador.','Error');
        this.enfocarInputCodigo();
        this.dineroRecibido = 0;
      },
      complete:() => {
      }
    });
  }
  
}

export interface ItemCarrito {
  producto: ProductoDto;
  cantidad: number;
}