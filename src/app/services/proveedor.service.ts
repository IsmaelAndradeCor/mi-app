import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ProveedorResponsetDto } from '../models/dtos/responses/proveedor-response-dto';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor() { }

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/Proveedor';

  getProveedores(): Observable<ProveedorResponsetDto[]>{
    return this.http.get<ProveedorResponsetDto[]>(this.urlBase + '/listar_proveedores');
  }

}
