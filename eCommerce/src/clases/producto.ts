export interface Producto{
    id:number,
    timestamp:number,
    nombre:string,
    descripcion:string,
    codigo:string,
    fotoUrl:string,
    precio:number,
    stock:number
}

// export class Producto{
//     constructor(public nombre:string,public descripcion:string,public codigo:string,public fotoUrl:string,public precio:number,public stock:number){
//         this.nombre = nombre;
//         this.descripcion = descripcion;
//         this.codigo = codigo;
//         this.fotoUrl = fotoUrl;
//         this.precio = precio;
//         this.stock = stock;
//     }
// }
