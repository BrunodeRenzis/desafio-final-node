const socket = io.connect(); //Acá conectamos el cliente con el servidor
socket.on('productos',data=>{
    console.log(data);
    render(data);
})

const agregarProducto = (e)=>{
    const producto = {
        nombre:document.getElementById('nombre').value,
        descripcion:document.getElementById('descripcion').value,
        codigo:document.getElementById('codigo').value,
        thumbnail:document.getElementById('thumbnail').value,
        precio:document.getElementById('precio').value,
        stock: document.getElementById('stock').value
    }
    socket.emit('nuevo-producto',producto);
    return false;
}

function render(data){
    const html = data.map((producto)=>{
        return `<div>
                    <strong>${producto.nombre}</strong>
                    <em>${producto.descripcion}</em>
                    <em>${producto.codigo}</em>
                    <em>${producto.thumbnail}</em>
                    <em>${producto.precio}</em>
                    <em>${producto.stock}</em>
                </div>`
    }).join(" ");
    console.log("Entró al render de productos");
    document.getElementById('productos').innerHTML = html;
}



socket.on('productos',function(data){render(data);});