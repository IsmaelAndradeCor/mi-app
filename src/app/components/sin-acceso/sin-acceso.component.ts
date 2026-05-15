import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sin-acceso',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5 text-center">
      <h3>No tienes acceso</h3>
      <p>Tu usuario no tiene permisos asignados para entrar a ningún módulo.</p>
      <p>Contacta al administrador del sistema.</p>
    </div>
  `
})
export class SinAccesoComponent {}