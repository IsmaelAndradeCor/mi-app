import { ProductoResponseDto } from "./dtos/responses/producto-response-dto";

export interface ItemCarrito {
  producto: ProductoResponseDto;
  cantidad: number;
}