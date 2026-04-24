import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ProductoUpsertDto } from '../models/dtos/requests/producto-upsert-dto';
import { ProductoResponseDto } from '../models/dtos/responses/producto-response-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor() { }

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/Producto';

  public getProductos(): Observable<ProductoResponseDto[]> {
    return this.http.get<ProductoResponseDto[]>(this.urlBase + '/listar_productos');
  }

  public getProductosStockMinimo(): Observable<ProductoResponseDto[]> {
    return this.http.get<ProductoResponseDto[]>(this.urlBase + '/stock_minimo');
  }

  public getProductoPorCodigo(codigo: string): Observable<ProductoResponseDto> {
    return this.http.get<ProductoResponseDto>(`${this.urlBase}/producto_codigo/${codigo}`);
  }

  public postProducto(producto: ProductoUpsertDto): Observable<void> {
    return this.http.post<void>(this.urlBase + '/crear_producto', producto);
  }

  public putProducto(producto: ProductoUpsertDto): Observable<void> {
    return this.http.put<void>(`${this.urlBase}/actualizar_producto`, producto);
  }

  public deleteProducto(codigo: string): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/eliminar_producto/${codigo}`);
  }
}
