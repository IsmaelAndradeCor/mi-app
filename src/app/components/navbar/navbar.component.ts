import { Component, OnDestroy } from '@angular/core';
import { NavigationStart, Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { PinAccessService } from '../../services/pin-access.service';
import { ToastrService } from 'ngx-toastr';
import { ModalPinComponent } from '../../modals/modal-pin/modal-pin.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, ModalPinComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnDestroy {

  constructor(
    public themeService: ThemeService,
    private router: Router,
    private pinAccessService: PinAccessService,
    private toastrService: ToastrService
  ) {
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
      const destino = event.url;

      if (!destino.startsWith(this.rutaProtegidaPendiente)) {
        this.pinAccessService.revocarAcceso();
      }
      }
    });
  }

  mostrarModalPin = false;
  rutaProtegidaPendiente = '/venta/venta';
  private routerSub: Subscription;

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  abrirVistaProtegida(): void {
    if (this.pinAccessService.tieneAcceso()) {
      this.router.navigate([this.rutaProtegidaPendiente]);
      return;
    }

    this.mostrarModalPin = true;
  }

  cancelarPin(): void {
    this.mostrarModalPin = false;
    this.pinAccessService.revocarAcceso();
    this.router.navigate(['/home']);
  }

  confirmarPin(pin: string): void {
    this.pinAccessService.validarPin(pin).subscribe({
      next: (response) => {
        if (response.autorizado) {
          this.pinAccessService.concederAcceso();
          this.mostrarModalPin = false;
          this.router.navigate([this.rutaProtegidaPendiente]);
        }
      },
      error: () => {
        this.toastrService.error('Pin incorrecto.');
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }
}
