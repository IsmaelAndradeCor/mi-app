import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-pin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-pin.component.html',
  styleUrl: './modal-pin.component.scss'
})
export class ModalPinComponent implements OnInit {

  @ViewChild('inputCodigo') inputCodigo!: ElementRef<HTMLInputElement>;

  @Output() cancelar = new EventEmitter<void>();
  @Output() confirmar = new EventEmitter<string>();

  pin = '';

  ngOnInit(): void {
    this.enfocarInputCodigo();
  }
  cerrar(): void {
    this.cancelar.emit();
  }

  aceptar(): void {
    this.confirmar.emit(this.pin);
  }

  enfocarInputCodigo() {
    setTimeout(() => {
      this.inputCodigo?.nativeElement.focus();
      this.inputCodigo?.nativeElement.select();
    }, 0);
  }
}
