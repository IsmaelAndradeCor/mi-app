import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface ValidarPinResponseDto {
  autorizado: boolean;
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})
export class PinAccessService {

  private readonly urlBase = environment.apiURL + '/Seguridad';
  private accesoVistaProtegida = false;

  constructor(private http: HttpClient) {}

  validarPin(pin: string): Observable<ValidarPinResponseDto> {
    return this.http.post<ValidarPinResponseDto>(`${this.urlBase}/validar-pin`, { pin });
  }

  concederAcceso(): void {
    this.accesoVistaProtegida = true;
  }

  revocarAcceso(): void {
    this.accesoVistaProtegida = false;
  }

  tieneAcceso(): boolean {
    return this.accesoVistaProtegida;
  }
}