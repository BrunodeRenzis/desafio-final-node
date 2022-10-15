import { Producto } from "./producto";

export interface Carrito{
    id:number,
    timestamp:number,
    productos:Producto[]
}