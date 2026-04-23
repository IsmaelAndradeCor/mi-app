import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CategoriaResponseDto } from '../models/dtos/responses/categoria-response-dto';
import { Observable } from 'rxjs';
import { CategoriaUpsertDto } from '../models/dtos/requests/categoria-upsert-dto';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor() { }

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/Categoria';

  // Devuelve un arreglo de Categorias
  public getCategorias() : Observable<CategoriaResponseDto[]> { 
    return this.http.get<CategoriaResponseDto[]>(this.urlBase + '/listar_categorias');
  }

  // Devuelve un objeto de Categoria
  public getCategoriaPorId(idCategoria: number): Observable<CategoriaResponseDto> {
    return this.http.get<CategoriaResponseDto>(`${this.urlBase}/obtener_categoria/${idCategoria}`);
  }

  // Inserta una Categoria con su Upsert y devuelve la Categoria insertada en un Response
  public postCategoria(categoriaUpsertDto: CategoriaUpsertDto): Observable<CategoriaResponseDto> {
    return this.http.post<CategoriaResponseDto>(this.urlBase + '/crear_categoria', categoriaUpsertDto);
  }

  // Actualizar una Marca con su Id y Upsert, regresa una Categoria en Response
  public putCategoria(idCategoria: number, categoriaUpsertDto: CategoriaUpsertDto): Observable<CategoriaResponseDto> {
    return this.http.put<CategoriaResponseDto>(`${this.urlBase}/actualizar_categoria/${idCategoria}`, categoriaUpsertDto);
  }

  public deleteCategoria(idCategoria: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/eliminar_categoria/${idCategoria}`);
  }

}
