import { Component, ElementRef, ViewChild } from '@angular/core';
import { MarcaUpsertDto } from '../../../models/dtos/requests/marca-upsert-dto';
import { FormsModule } from '@angular/forms';
import { MarcaService } from '../../../services/marca.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-marca',
  imports: [FormsModule],
  templateUrl: './crear-marca.component.html',
  styleUrl: './crear-marca.component.scss'
})
export class CrearMarcaComponent {

  @ViewChild('inputNombre') inputNombre!: ElementRef<HTMLInputElement>;

  constructor(private marcaService: MarcaService,
      private toastrService: ToastrService){}

  marcaUpsertDto: MarcaUpsertDto = {
    nombre : ''
  }

  crearMarca(): void {
    this.marcaService.postMarca(this.marcaUpsertDto).subscribe({
      next:(response) => {
        this.toastrService.success('Marca ' + response.nombre + ' creada correctamente.');
        
        //Limpiamos nuestro Upsert
        this.marcaUpsertDto = {
          nombre : ''
        }

        //Nos posicionamos en el input
        this.enfocarInput();
      },
      error:(err) => {
      if (err.status === 400) {
        console.error(err.error.mensaje);
      } else if (err.status === 500) {
        console.error('Error interno del servidor: ' + err.error);
      } else if (err.status === 0) {
        console.error('No se pudo conectar con el servidor');
      } else {
        console.error('Ocurrió un error inesperado');
      }

      this.toastrService.error(err.error.mensaje);
      }
    })
  }

  private enfocarInput(): void {
    setTimeout(() => {
      this.inputNombre.nativeElement.focus();
    });
  }

}
