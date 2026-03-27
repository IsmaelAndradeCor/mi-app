import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ProductoDto } from '../models/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor() { }

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/Producto';

  public postProducto(producto: ProductoDto): Observable<void> {
    return this.http.post<void>(this.urlBase + '/producto', producto);
  }

  public getProductos(): Observable<ProductoDto[]> {
    return this.http.get<ProductoDto[]>(this.urlBase + '/productos');
  }

  public getProductoPorCodigo(codigo: string): Observable<ProductoDto> {
    return this.http.get<ProductoDto>(`${this.urlBase}/codigo/${codigo}`);
  }

  public putProducto(codigo: string, producto: ProductoDto): Observable<void> {
    return this.http.put<void>(`${this.urlBase}/producto/${codigo}`, producto);
  }

  public deleteProducto(codigo: string): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/producto/${codigo}`);
  }
}
