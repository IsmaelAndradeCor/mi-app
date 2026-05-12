import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrearUnidadMedidaComponent } from '../crear-unidad-medida/crear-unidad-medida.component';
import { ActualizarUnidadMedidaComponent } from '../actualizar-unidad-medida/actualizar-unidad-medida.component';
import { ConfirmarModalComponent } from '../../../modals/confirmar-modal/confirmar-modal.component';
import { UnidadMedidaService } from '../../../services/unidad-medida.service';
import { ToastrService } from 'ngx-toastr';
import { UnidadMedidaResponseDto } from '../../../models/dtos/responses/unidad-medida-response-dto';

@Component({
  selector: 'app-listar-unidades-medida',
  imports: [CommonModule, FormsModule, CrearUnidadMedidaComponent, ActualizarUnidadMedidaComponent, ConfirmarModalComponent],
  templateUrl: './listar-unidades-medida.component.html',
  styleUrl: './listar-unidades-medida.component.scss'
})
export class ListarUnidadesMedidaComponent {

  constructor(private unidadMedidaService: UnidadMedidaService,
              private toastrService: ToastrService
  ) { }

  unidadesMedida: UnidadMedidaResponseDto[] = [];
  unidadesMedidaFiltradas: UnidadMedidaResponseDto[] = [];
  objetoActualizar: UnidadMedidaResponseDto | null = null;

  idEliminar: number | null = null;
  nombreEliminar: string = '';

  mostrarActualizar: boolean = false;
  mostrarEliminar: boolean = false;

  textoBusqueda: string = '';

  ngOnInit(): void {
    this.getUnidadesMedida();
  }

  getUnidadesMedida(): void {
    this.unidadMedidaService.getUnidadesMedida().subscribe({
      next: (response) => {
        this.unidadesMedida = response;
        this.unidadesMedidaFiltradas = [...this.unidadesMedida];
      }
    });
  }

  mostrarModalActualizarPorId(idUnidadMedida: number): void {
    this.unidadMedidaService.getUnidadMedida(idUnidadMedida).subscribe({
      next: (response) => {
        this.objetoActualizar = response;
        this.mostrarActualizar = true;
      },
      error: (error) => {
        this.toastrService.error('Ocurrió un error al buscar la Unidad de Medida, por favor contacte al administrador.');
      }
    });
  }

  cerrarModalActualizar(): void {
    this.mostrarActualizar = false;
    this.objetoActualizar = null;
  }

  actualizarEnLista(unidadMedidaActualizada: UnidadMedidaResponseDto): void {
    const index = this.unidadesMedida.findIndex(x => x.id === unidadMedidaActualizada.id);

    if (index !== -1) {
      this.unidadesMedida[index] = unidadMedidaActualizada;
      this.unidadesMedidaFiltradas = [...this.unidadesMedida];
      this.filtrarTabla();
    }

    this.cerrarModalActualizar();
  }

  mostrarModalConfirmarEliminar(idUnidadMedida: number): void {
    this.idEliminar = idUnidadMedida;
    this.nombreEliminar = this.unidadesMedida.find((i) => i.id === idUnidadMedida)?.nombre ?? '';
    this.mostrarEliminar = true;
  }

  eliminarPorId(idUnidadMedida: number): void {
    this.unidadMedidaService.deleteUnidadMedida(idUnidadMedida).subscribe({
      next:() => {
        this.unidadesMedida = this.unidadesMedida.filter(x => x.id !== idUnidadMedida);
        this.filtrarTabla();

        this.toastrService.success('Unidad de Medida eliminada con éxito');
      },
      error: (error) => {
        this.toastrService.error('Ocurrió un error al eliminar la Unidad de Medida, por favor contacte al administrador.');
      }
    })
  }

  cerrarModalConfirmarEliminar(): void {
    this.mostrarEliminar = false;
    this.idEliminar = null;
    this.nombreEliminar = '';
  }

  filtrarTabla(): void {
    const texto = this.textoBusqueda.trim().toLowerCase();

    if (!texto) {
      this.unidadesMedidaFiltradas = [...this.unidadesMedida];
      return;
    }

    this.unidadesMedidaFiltradas = this.unidadesMedida.filter(x =>
      x.nombre.toLowerCase().includes(texto)
    );
  }

  limpiarTextoBusqueda(): void {
    this.textoBusqueda = '';
    this.filtrarTabla();
  }

  unidadMedidaCreada(unidadMedidaCreada: UnidadMedidaResponseDto): void {
    this.unidadesMedida.push(unidadMedidaCreada);
    this.filtrarTabla();
  }
}
