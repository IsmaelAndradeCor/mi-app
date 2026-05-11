import { Component, OnInit } from '@angular/core';
import { CrearMarcaComponent } from '../crear-marca/crear-marca.component';
import { ActualizarMarcaComponent } from '../actualizar-marca/actualizar-marca.component';
import { MarcaService } from '../../../services/marca.service';
import { MarcaResponseDto } from '../../../models/dtos/responses/marca-response-dto';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ConfirmarModalComponent } from '../../../modals/confirmar-modal/confirmar-modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-marcas',
  imports: [CrearMarcaComponent, ActualizarMarcaComponent, ConfirmarModalComponent, CommonModule, FormsModule],
  templateUrl: './listar-marcas.component.html',
  styleUrl: './listar-marcas.component.scss'
})
export class ListarMarcasComponent implements OnInit {

  constructor(private marcaService: MarcaService,
              private toastrService: ToastrService
  ){}

  marcas: MarcaResponseDto[] = [];
  marcasFiltradas: MarcaResponseDto[] = [];
  marcaActualizar: MarcaResponseDto | null = null;

  idMarcaEliminar: number | null = null;
  nombreMarcaEliminar: string = '';

  mostrarActualizarMarca: boolean = false;
  mostrarConfirmarEliminarMarca: boolean = false;

  textoBusqueda: string = '';

  ngOnInit(): void {
    this.getMarcas();
  }

  getMarcas(): void {
    this.marcaService.getMarcas().subscribe({
      next:(response) => {
        this.marcas = response;
        this.marcasFiltradas = [... this.marcas];
      }
    })
  }

  mostrarModalActualizarMarcaPorId(idMarca: number): void {
    this.marcaService.getMarca(idMarca).subscribe({
      next: (marca) => {
        this.marcaActualizar = marca;
        this.mostrarActualizarMarca = true;
      },
      error: (error) => {
        this.toastrService.error('Ocurrió un error al buscar la Marca, por favor contacte al administrador.');
      }
    });
  }

  cerrarModalActualizar(): void {
    this.mostrarActualizarMarca = false;
    this.marcaActualizar = null;
  }

  actualizarMarcaEnLista(marcaActualizada: MarcaResponseDto): void {
    const index = this.marcas.findIndex(m => m.id === marcaActualizada.id);

    if (index !== -1) {
      this.marcas[index] = marcaActualizada;
      this.marcas = [...this.marcas];
    }

    this.cerrarModalActualizar();
  }

  mostrarModalConfirmarEliminar(idMarca: number): void {
    this.idMarcaEliminar = idMarca;
    this.nombreMarcaEliminar = this.marcas.find((i) => i.id === idMarca)?.nombre ?? '';
    this.mostrarConfirmarEliminarMarca = true;
  }

  eliminarMarcaPorId(idMarca: number): void {
    this.marcaService.deleteMarca(idMarca).subscribe({
      next:() => {
        this.marcas = this.marcas.filter(x => x.id !== idMarca);
        this.filtrarMarcas();

        this.toastrService.success('Marca eliminada con éxito');
      },
      error: (error) => {
        this.toastrService.error('Ocurrió un error al eliminar la Marca, por favor contacte al administrador.');
      }
    })
  }

  cerrarModalConfirmarEliminar(): void {
    this.mostrarConfirmarEliminarMarca = false;
    this.idMarcaEliminar = null;
    this.nombreMarcaEliminar = '';
  }

  filtrarMarcas(): void {
    const texto = this.textoBusqueda.trim().toLowerCase();

    if (!texto) {
      this.marcasFiltradas = [...this.marcas];
      return;
    }

    this.marcasFiltradas = this.marcas.filter(x =>
      x.nombre.toLowerCase().includes(texto)
    );
  }
}
