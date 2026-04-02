import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmar-modal',
  imports: [CommonModule],
  templateUrl: './confirmar-modal.component.html',
  styleUrl: './confirmar-modal.component.scss'
})
export class ConfirmarModalComponent {

  @Input() mostrarConfirmarEliminarProducto = false;
  @Input() titulo: string = "";
  @Input() mensaje: string = "";
  @Input() codigo: string = '';

  @Output() cerrarModal = new EventEmitter<void>();  
  @Output() confirmarModal = new EventEmitter<string>(); 

  cerrar() {
    this.cerrarModal.emit();  // Emite evento al padre
  }

  confirmar() {
    this.confirmarModal.emit(this.codigo);  // Emite evento al padre
    this.cerrarModal.emit();  // Emite evento al padre
  }
}
