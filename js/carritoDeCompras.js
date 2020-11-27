
// FUNCION PARA CARGA LA WEB MUESTRE LISTADO DE PRODUCTOS.
$(document).ready(function() {
    implementarCarrito();


});


var carritoDeCompras = {};
var ItemID = 1;

function implementarCarrito() {
    listarproductos();
    

}


function listarproductos() {
   for (var i = 0; i < BaseDeDatos.length; i++) {
        $('#mostrarProductos').append(
            '<div class="col-lg-3 col-sm-3 col-xs-3  mb-4">' +
            '<div class="card border border-dark">' +
            '<a href="#"><img class="card-img-top img-responsive img-fluid " src="img/' + BaseDeDatos[i].img + '" ></a>' +
            '<div class="card-body">' +
            '<h4 class="card-title">' +
            '<a href="#" style="text-decoration:none;color:black">' + BaseDeDatos[i].nombre + '</a>' +
            '</h4>' +
            '<del> $ ' + BaseDeDatos[i].precioA + '</del>' +
            '<h5 style="color:black">$ ' + BaseDeDatos[i].precio + '</h5>' +
            '<p class="card-text dark">' + BaseDeDatos[i].descripcion + '</p>' +
            '</div>' +
            '<div class="card-footer">' +
            '<button type="button" class="btn btn-dark" onclick="agregarCarrito(' + i + ')">AGREGAR</button>' +
            '</div>' +
            '</div >' +
            '</div >'
        )
    }
   
}

 




function agregarACarrito(id) {
    var producto = BaseDeDatos[id];

    $('#listado-carrito').append(
        '<div id="' + carritoDeCompras[id].elemento_id + '">' +
        '<div class="row p-4">' +
        '<div class="card w-100">' +
        '<div class="card-body">' +
        '<div class="row">' +
        '<div class="col-8">' +
       ' <ul><li class="card-title ">'+'Producto:'+' '+ producto.nombre +'</li></ul> ' +
       '  <ul><li >' +'Precio:'+' '+ producto.precio +' '+'Pesos'+'</li></ul>' +
       '  <ul><li class="cantidad">' +'cantidad:'+' ' + 1 + '</li></ul>' +
        '<button class="btn btn-outline-dark text-center " onclick="agregarCarrito(' + id + ')"><i class="fas fa-plus-square"></i> </button>' +
        '<button class="btn btn-outline-dark text-center ml-3 " onclick="eliminarDeCarrito(' + id + ')"> <i class="fas fa-minus-square"></i> </button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div >' +
        '</div >' +
        '</div >'
    )

    actualizarCarrito();

}





function eliminarDeCarrito(id) {
    carritoDeCompras[id].cantidad--;

    if (carritoDeCompras[id].cantidad > 0) {


        actualizarCantidad(id);

    } else {

        var element = document.getElementById(carritoDeCompras[id].elemento_id);



        element.parentNode.removeChild(element); 


    }

    actualizarCarrito();

}

function precioTotal() {
    var total = 0;
    for (var id in carritoDeCompras) {

        total += BaseDeDatos[id].precio * carritoDeCompras[id].cantidad;

    }
    return total;




}

function borrarProductosCarrito(id) {
    carritoDeCompras = {};
    $("#listado-carrito").empty();
    actualizarCarrito();
    
    if (carritoDeCompras[id].cantidad == 0){
        $("#total-compra").html("$" + precioTotal());
        
    }
}

function agregarCarrito(id) {
    

    if (id in carritoDeCompras && carritoDeCompras[id].cantidad > 0) {

        carritoDeCompras[id].cantidad++;
        actualizarCantidad(id);
    } else {

        carritoDeCompras[id] = {
            cantidad: 1,
            elemento_id: + ItemID
        };
        ItemID++;

        agregarACarrito(id);

    }
    actualizarCarrito();

}

function actualizarCantidad(id) {
    $("#" + carritoDeCompras[id].elemento_id + " .cantidad").html('Cantidad ' + carritoDeCompras[id].cantidad);


}

function totalyCantidad() {
    var total = 0

    for (var id in carritoDeCompras) {

        total += carritoDeCompras[id].cantidad



    }
    return total;

}


function actualizarCarrito() {
    var actualiCarrito = totalyCantidad();
    if (actualiCarrito > 0) $("#carro").html(actualiCarrito);
    else $("#carro").html("");
    $("#total-compra").html("$" + precioTotal()+" "+ "PESOS");
    
}
