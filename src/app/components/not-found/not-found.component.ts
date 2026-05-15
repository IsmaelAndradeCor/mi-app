import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5 text-center">
      <h3>404</h3>
      <p>¡Ups! La página que buscas no existe o ha sido movida.</p>
      <p>Contacta al administrador del sistema.</p>
    </div>
  `
})
export class NotFoundComponent {

}
