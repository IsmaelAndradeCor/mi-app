import { inject, Injectable } from '@angular/core';
import { VentaDto } from '../models/venta';
import { DetalleVentaDto } from '../models/detalle-venta';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { GenerarVentasDTO } from '../models/generar-ventas-dto';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor() { }

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/Venta';

  private xmlDetalleVenta(detalles: DetalleVentaDto[]): string {
    const itemsXml = detalles.map(d => `
      <Item>
        <IdProducto>${d.idProducto}</IdProducto>
        <Codigo>${d.codigo}</Codigo>
        <Nombre>${d.nombre}</Nombre>
        <Cantidad>${d.cantidad}</Cantidad>
        <Costo>${d.costo}</Costo>
        <Precio>${d.precio}</Precio>
      </Item>
    `).join('');

    return `<Items>${itemsXml}</Items>`;
  }

  public registrarVenta(venta: VentaDto): Observable<number> {
    const detalleXml = this.xmlDetalleVenta(venta.detalles);  // Convertir a XML
    
    return this.http.post<number>(`${this.urlBase}/realizar_venta`, {
      folio: venta.folio,
      idUsuario: 1,
      total: venta.total,
      detalle: detalleXml
    });
  }

  public getGenerarVentas(): Observable<GenerarVentasDTO[]> {
    return this.http.get<GenerarVentasDTO[]>(`${this.urlBase}/generar_ventas`);
  }
}
