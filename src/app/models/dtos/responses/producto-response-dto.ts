import { CategoriaResponseDto } from "./categoria-response-dto";
import { MarcaResponseDto } from "./marca-response-dto";
import { ProveedorResponsetDto } from "./proveedor-response-dto";
import { UnidadMedidaResponseDto } from "./unidad-medida-response-dto";

export interface ProductoResponseDto {
    id: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    costo: number;
    precio: number;
    stock: number;
    stockMinimo: number;
    categoria: CategoriaResponseDto;
    marca: MarcaResponseDto;
    unidadMedida: UnidadMedidaResponseDto;
    proveedores: ProveedorResponsetDto[];
}
