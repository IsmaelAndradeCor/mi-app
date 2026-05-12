import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriaResponseDto } from '../../../models/dtos/responses/categoria-response-dto';
import { CategoriaService } from '../../../services/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { CategoriaUpsertDto } from '../../../models/dtos/requests/categoria-upsert-dto';

@Component({
  selector: 'app-crear-categoria',
  imports: [FormsModule],
  templateUrl: './crear-categoria.component.html',
  styleUrl: './crear-categoria.component.scss'
})
export class CrearCategoriaComponent {

  @ViewChild('inputNombre') inputNombre!: ElementRef<HTMLInputElement>;

  @Output() objetoCreado = new EventEmitter<CategoriaResponseDto>();

  constructor(private categoriaService: CategoriaService,
      private toastrService: ToastrService){}

  categoriaUpsertDto: CategoriaUpsertDto = {
    nombre : ''
  }

  crearCategoria(): void {
    this.categoriaService.postCategoria(this.categoriaUpsertDto).subscribe({
      next:(response) => {
        this.toastrService.success('Categoria ' + response.nombre + ' creada correctamente.');
        
        //Limpiamos nuestro Upsert
        this.categoriaUpsertDto = {
          nombre : ''
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
