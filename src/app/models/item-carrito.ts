import { ProductoDto } from "./producto.interface";

export interface ItemCarrito {
  producto: ProductoDto;
  cantidad: number;
}