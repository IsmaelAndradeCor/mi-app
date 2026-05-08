import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-pin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-pin.component.html',
  styleUrl: './modal-pin.component.scss'
})
export class ModalPinComponent {
  @Output() cancelar = new EventEmitter<void>();
  @Output() confirmar = new EventEmitter<string>();

  pin = '';

  cerrar(): void {
    this.cancelar.emit();
  }

  aceptar(): void {
    this.confirmar.emit(this.pin);
  }
}
