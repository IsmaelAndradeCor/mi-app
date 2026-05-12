import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UnidadMedidaService } from '../../../services/unidad-medida.service';
import { ToastrService } from 'ngx-toastr';
import { UnidadMedidaResponseDto } from '../../../models/dtos/responses/unidad-medida-response-dto';
import { UnidadMedidaUpsertDto } from '../../../models/dtos/requests/unidad-medida-upsert-dto';

@Component({
  selector: 'app-actualizar-unidad-medida',
  imports: [],
  templateUrl: './actualizar-unidad-medida.component.html',
  styleUrl: './actualizar-unidad-medida.component.scss'
})
export class ActualizarUnidadMedidaComponent {

  constructor(private unidadMedidaService: UnidadMedidaService,
              private toastrService: ToastrService
  ){}

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() objetoActualizado = new EventEmitter<UnidadMedidaResponseDto>();

  @Input() objetoActualizar: UnidadMedidaResponseDto | null = null;
  @Input() mostrarActualizar = false;

  unidadMedidaUpsertDto: UnidadMedidaUpsertDto = {
    nombre : '',
    clave : '',
    permiteDecimales : false
  }

  unidadMedidaNombre: string = '';

  cerrar() {
    this.cerrarModal.emit();  // Emite evento al padre
  }

  guardarCambios() {
    if (this.objetoActualizar) {
      this.unidadMedidaUpsertDto.nombre = this.unidadMedidaNombre;

      this.unidadMedidaService.putUnidadMedida(this.objetoActualizar.id, this.unidadMedidaUpsertDto).subscribe({
        next:(response) => {
          this.objetoActualizar = response;
          this.toastrService.success('Unidad de Medida actualizada correctamente!');
          this.objetoActualizado.emit(response);
          this.cerrarModal.emit();
        },
        error:(response) => {
          this.toastrService.error('Ocurrió un error al actualizar la Unidad de Medida, por favor contacta al administrador.');
        }
      })
    }
  }
}
