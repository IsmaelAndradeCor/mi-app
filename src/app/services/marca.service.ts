import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { MarcaUpsertDto } from '../models/dtos/requests/marca-upsert-dto';
import { Observable } from 'rxjs';
import { MarcaResponseDto } from '../models/dtos/responses/marca-response-dto';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor() { }

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/Marca';

  public getMarcas() : Observable<MarcaResponseDto[]> { 
    return this.http.get<MarcaResponseDto[]>(this.urlBase + '/listar_marcas');
  }

  public getMarca(idMarca: number): Observable<MarcaResponseDto> {
    return this.http.get<MarcaResponseDto>(this.urlBase + '/obtener_marca/' + idMarca);
  }

  public postMarca(marcaUpsertDto: MarcaUpsertDto): Observable<MarcaResponseDto> {
    return this.http.post<MarcaResponseDto>(this.urlBase + '/crear_marca', marcaUpsertDto);
  }

  public putMarca(idMarca: number, marcaUpsertDto: MarcaUpsertDto): Observable<MarcaResponseDto> {
    return this.http.put<MarcaResponseDto>(`${this.urlBase}/actualizar_marca/${idMarca}`, marcaUpsertDto);
  }

  public deleteMarca(idMarca: number): Observable<void> {
    return this.http.delete<void>(this.urlBase + '/eliminar_marca/' + idMarca);
  }

}
