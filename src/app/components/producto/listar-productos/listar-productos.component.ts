import { Component, OnInit, ViewChild } from '@angular/core';
import { ActualizarProductoComponent } from '../actualizar-producto/actualizar-producto.component';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../../services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmarModalComponent } from '../../../modals/confirmar-modal/confirmar-modal.component';
import { ProductoResponseDto } from '../../../models/dtos/responses/producto-response-dto';
import { MarcaService } from '../../../services/marca.service';
import { ProveedorService } from '../../../services/proveedor.service';
import { CategoriaService } from '../../../services/categoria.service';
import { UnidadMedidaService } from '../../../services/unidad-medida.service';
import { CategoriaResponseDto } from '../../../models/dtos/responses/categoria-response-dto';
import { MarcaResponseDto } from '../../../models/dtos/responses/marca-response-dto';
import { UnidadMedidaResponseDto } from '../../../models/dtos/responses/unidad-medida-response-dto';
import { ProveedorResponsetDto } from '../../../models/dtos/responses/proveedor-response-dto';

// // Simular API
// const fetchProductos = async (): Promise<Producto[]> => {
//   return new Promise(resolve => setTimeout(() => resolve(productosMock), 500));
// };

@Component({
  selector: 'app-listar-productos',
  imports: [CommonModule ,ActualizarProductoComponent, ConfirmarModalComponent],
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.scss'
})

export class ListarProductosComponent implements OnInit {

  constructor(
    private productoService: ProductoService,
    private marcaService: MarcaService,
    private proveedorService: ProveedorService,
    private toastrService: ToastrService,
    private categoriaService: CategoriaService,
    private unidadMedidaService: UnidadMedidaService
  ){}

  categorias: CategoriaResponseDto[] = [];
  marcas: MarcaResponseDto[] = [];
  unidadesMedida: UnidadMedidaResponseDto[] = [];
  proveedores: ProveedorResponsetDto[] = [];

  productosDto: ProductoResponseDto[] = [];
  productoActualizar: ProductoResponseDto | null = null;;
  mostrarActualizarProducto: boolean = false;

  mostrarConfirmarEliminarProducto: boolean = false;
  codigoProductoEliminar: string = '';

  productosPorCodigo: Map<string, ProductoResponseDto> = new Map();  // ← Tu diccionario
  
  ngOnInit() {
    this.getProductos();
    this.getCategorias();
    this.getMarcas();
    this.getUnidadesMedida();
    this.getProveedores();
  }

  getProductos(): void {
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

  getCategorias(): void {
    this.categoriaService.getCategorias().subscribe({
      next:(response) => {
        this.categorias = response;
      },
      error:() =>
        this.toastrService.error('Ocurrió un error al cargar las Categorias, por favor contacta al Administrador.')
    })
  }

  getMarcas(): void {
    this.marcaService.getMarcas().subscribe({
      next:(response) => {
        this.marcas = response;
      },
      error:() =>
        this.toastrService.error('Ocurrió un error al cargar las Marcas, por favor contacta al Administrador.')
    })
  }

  getUnidadesMedida(): void {
    this.unidadMedidaService.getUnidadesMedida().subscribe({
      next:(response) => {
        this.unidadesMedida = response;
      },
      error:() =>
        this.toastrService.error('Ocurrió un error al cargar las Unidades de Medida, por favor contacta al Administrador.')
    })
  }

  getProveedores(): void {
    this.proveedorService.getProveedores().subscribe({
      next:(response) => {
        this.proveedores = response;
      },
      error:() =>
        this.toastrService.error('Ocurrió un error al cargar los Proveedores, por favor contacta al Administrador.')
    })
  }

  eliminarProductoPorCodigo(codigo: string): void {

    this.productoService.deleteProducto(codigo).subscribe({
      next:() => {
        // 1. Eliminar del Map (rápido)
        this.productosPorCodigo.delete(codigo);

        // 2. Recrear el array sin ese producto
        this.productosDto = this.productosDto.filter(x => x.codigo !== codigo);

        // 3. Muesta el mensaje de exito
        this.toastrService.success('Producto eliminado con éxito.')
      },
      error: (error) => {
        this.toastrService.error('Ocurrió un error al eliminar el producto, por favor contacte al administrador.');
      }
    });
  }

  abrirModalActualizarProductoPorCodigo(codigo: string): void {
    // Llama al servicio en lugar de find()
    this.productoService.getProductoPorCodigo(codigo).subscribe({
      next: (producto) => {
        this.productoActualizar = producto;
        console.log(producto);
        this.mostrarActualizarProducto = true;
      },
      error: (error) => {
        this.toastrService.error('Ocurrió un error al buscar el producto, por favor contacte al administrador.');
      }
    });
  }

  cerrarModalActualizar(): void {
    this.mostrarActualizarProducto = false;
    this.productoActualizar = null;
  }

  mostrarModalConfirmarEliminar(codigo: string): void {
    this.codigoProductoEliminar = codigo;
    this.mostrarConfirmarEliminarProducto = true;
  }

  cerrarModalConfirmarEliminar(): void {
    this.mostrarConfirmarEliminarProducto = false;
    this.codigoProductoEliminar = '';
  }
}
