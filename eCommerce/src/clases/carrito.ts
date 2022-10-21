import { Producto } from "./producto";

export interface Carrito{
    id:number,
    timestamp:number,
    productos:Producto[]
}


// export class Carrito{
//     constructor(public productos:Producto[]){
//         this.productos = productos;
//     }
// }