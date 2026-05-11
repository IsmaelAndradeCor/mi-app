import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MarcaUpsertDto } from '../../../models/dtos/requests/marca-upsert-dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MarcaResponseDto } from '../../../models/dtos/responses/marca-response-dto';
import { MarcaService } from '../../../services/marca.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actualizar-marca',
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizar-marca.component.html',
  styleUrl: './actualizar-marca.component.scss'
})
export class ActualizarMarcaComponent {

  constructor(private marcaService: MarcaService,
              private toastrService: ToastrService
  ){}

  @Output() cerrarModal = new EventEmitter<void>();  // ← Output correcto para cerrar
  @Output() marcaActualizada = new EventEmitter<MarcaResponseDto>();

  @Input() marcaActualizar: MarcaResponseDto | null = null;
  @Input() mostrarActualizarMarca = false;

  marcaUpsert: MarcaUpsertDto = {
    nombre: ''
  }

  marcaNombre: string = '';

  cerrar() {
    this.cerrarModal.emit();  // Emite evento al padre
  }

  guardarCambios() {
    if (this.marcaActualizar) {
      this.marcaUpsert.nombre = this.marcaNombre;

      this.marcaService.putMarca(this.marcaActualizar.id, this.marcaUpsert).subscribe({
        next:(response) => {
          this.marcaActualizar = response;
          this.toastrService.success('Marca actualizada correctamente!');
          this.marcaActualizada.emit(response);
          this.cerrarModal.emit();
        },
        error:(response) => {
          this.toastrService.error('Ocurrió un error al actualizar la Marca, por favor contacta al administrador.');
        }
      })
    }
  }
}
