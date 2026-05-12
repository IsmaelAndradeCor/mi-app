import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UnidadMedidaService } from '../../../services/unidad-medida.service';
import { ToastrService } from 'ngx-toastr';
import { UnidadMedidaResponseDto } from '../../../models/dtos/responses/unidad-medida-response-dto';
import { UnidadMedidaUpsertDto } from '../../../models/dtos/requests/unidad-medida-upsert-dto';

@Component({
  selector: 'app-crear-unidad-medida',
  imports: [FormsModule],
  templateUrl: './crear-unidad-medida.component.html',
  styleUrl: './crear-unidad-medida.component.scss'
})
export class CrearUnidadMedidaComponent {

  @ViewChild('inputNombre') inputNombre!: ElementRef<HTMLInputElement>;

  @Output() objetoCreado = new EventEmitter<UnidadMedidaResponseDto>();

  constructor(private unidadMedidaService: UnidadMedidaService,
              private toastrService: ToastrService
    ){ }

  unidadMedidaUpsertDto: UnidadMedidaUpsertDto = {
    nombre : '',
    clave : '',
    permiteDecimales : false
  }

  crearUnidadMedida(): void {
    this.unidadMedidaService.postUnidadMedida(this.unidadMedidaUpsertDto).subscribe({
      next:(response) => {
        this.toastrService.success('Unidad de Medida ' + response.nombre + ' creada correctamente.');
        
        //Limpiamos nuestro Upsert
        this.unidadMedidaUpsertDto = {
          nombre : '',
          clave : '',
          permiteDecimales : false
        }

        // Regresamos el objeto creado
        this.objetoCreado.emit(response);

        //Nos posicionamos en el input
        this.enfocarInput();
      }
    })
  }

  private enfocarInput(): void {
    setTimeout(() => {
      this.inputNombre.nativeElement.focus();
    });
  }
}
