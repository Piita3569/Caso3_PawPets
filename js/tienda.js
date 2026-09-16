// Catálogo de productos de la primera evaluación.
var listaProductos = [
    { id: 1, nombre: "Master Dog Adulto 15 kg", precio: 25000, imagen: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=600&q=80" },
    { id: 2, nombre: "Champion Cat 10 kg", precio: 18000, imagen: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=80" },
    { id: 3, nombre: "Hueso de goma", precio: 3500, imagen: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=600&q=80" },
    { id: 4, nombre: "Rascador para gatos", precio: 15000, imagen: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=600&q=80" }
];

// El carrito se mantiene durante la sesión para no perderlo al cambiar de página.
var carritoCompras = cargarCarrito();

document.addEventListener("DOMContentLoaded", function () {
    mostrarProductos();
    actualizarContador();
    mostrarCarrito();
});

function mostrarProductos() {
    var contenedor = document.getElementById("contenedor-productos");
    var i;

    if (contenedor == null) return;

    for (i = 0; i < listaProductos.length; i++) {
        contenedor.innerHTML +=
            '<div class="card">' +
                '<img src="' + listaProductos[i].imagen + '" alt="' + listaProductos[i].nombre + '">' +
                '<div class="card-body">' +
                    '<h3>' + listaProductos[i].nombre + '</h3>' +
                    '<p class="price">$' + listaProductos[i].precio + '</p>' +
                    '<a class="btn detail-link" href="detalle_producto.html">Ver detalle</a> ' +
                    '<button class="btn btn-primary" onclick="agregarAlCarrito(' + listaProductos[i].id + ')">Añadir</button>' +
                '</div>' +
            '</div>';
    }
}

function agregarAlCarrito(id) {
    var producto = buscarProducto(id);
    var productoEnCarrito;

    if (producto == null) return;

    productoEnCarrito = carritoCompras.find(function (item) {
        return item.id == id;
    });

    if (productoEnCarrito != null) {
        productoEnCarrito.cantidad = productoEnCarrito.cantidad + 1;
    } else {
        carritoCompras.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        });
    }

    guardarCarrito();
    actualizarContador();
    mostrarCarrito();
}

function guardarCarrito() {
    sessionStorage.setItem("carritoPawPets", JSON.stringify(carritoCompras));
}

function cargarCarrito() {
    var carritoGuardado;
    var productosNormalizados = [];
    var i;
    var existente;

    try {
        carritoGuardado = JSON.parse(sessionStorage.getItem("carritoPawPets")) || [];
    } catch (error) {
        carritoGuardado = [];
    }

    // Convierte el formato anterior (un objeto por cada unidad) al nuevo formato.
    for (i = 0; i < carritoGuardado.length; i++) {
        existente = productosNormalizados.find(function (item) {
            return item.id == carritoGuardado[i].id;
        });

        if (existente != null) {
            existente.cantidad = existente.cantidad + (carritoGuardado[i].cantidad || 1);
        } else {
            productosNormalizados.push({
                id: carritoGuardado[i].id,
                nombre: carritoGuardado[i].nombre,
                precio: carritoGuardado[i].precio,
                imagen: carritoGuardado[i].imagen,
                cantidad: carritoGuardado[i].cantidad || 1
            });
        }
    }

    return productosNormalizados;
}

function buscarProducto(id) {
    return listaProductos.find(function (producto) {
        return producto.id == id;
    });
}

function actualizarContador() {
    var contador = document.getElementById("contador-carrito");

    if (contador != null) {
        contador.innerHTML = calcularCantidadTotal();
    }
}

function mostrarCarrito() {
    var contenedor = document.getElementById("items-carrito");
    var totalCarrito = document.getElementById("total-carrito");
    var total = 0;
    var i;

    if (contenedor == null || totalCarrito == null) return;

    contenedor.innerHTML = "";

    if (carritoCompras.length == 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    } else {
        for (i = 0; i < carritoCompras.length; i++) {
            contenedor.innerHTML +=
                '<div class="cart-item">' +
                    '<img src="' + carritoCompras[i].imagen + '" alt="' + carritoCompras[i].nombre + '">' +
                    '<div><h3>' + carritoCompras[i].nombre + '</h3><p>$' + formatearPrecio(carritoCompras[i].precio) + ' c/u</p></div>' +
                    '<div class="quantity-control" aria-label="Cantidad de ' + carritoCompras[i].nombre + '">' +
                        '<button class="quantity-button" type="button" onclick="cambiarCantidad(' + carritoCompras[i].id + ', -1)" aria-label="Disminuir cantidad">−</button>' +
                        '<span>' + carritoCompras[i].cantidad + '</span>' +
                        '<button class="quantity-button" type="button" onclick="cambiarCantidad(' + carritoCompras[i].id + ', 1)" aria-label="Aumentar cantidad">+</button>' +
                    '</div>' +
                    '<strong>$' + formatearPrecio(carritoCompras[i].precio * carritoCompras[i].cantidad) + '</strong>' +
                    '<button class="remove" type="button" onclick="eliminarDelCarrito(' + carritoCompras[i].id + ')">Eliminar</button>' +
                '</div>';
            total = total + (carritoCompras[i].precio * carritoCompras[i].cantidad);
        }
    }

    totalCarrito.innerHTML = "Total: $" + formatearPrecio(total);
}

function cambiarCantidad(id, cambio) {
    var producto = carritoCompras.find(function (item) {
        return item.id == id;
    });

    if (producto == null) return;

    producto.cantidad = producto.cantidad + cambio;
    if (producto.cantidad <= 0) eliminarDelCarrito(id);
    else {
        guardarCarrito();
        actualizarContador();
        mostrarCarrito();
    }
}

function eliminarDelCarrito(id) {
    carritoCompras = carritoCompras.filter(function (item) {
        return item.id != id;
    });
    guardarCarrito();
    actualizarContador();
    mostrarCarrito();
}

function vaciarCarrito() {
    carritoCompras = [];
    sessionStorage.removeItem("carritoPawPets");
    actualizarContador();
    mostrarCarrito();
}

function pagar() {
    var mensaje = document.getElementById("mensajeCompra");

    if (carritoCompras.length == 0) {
        mensaje.innerHTML = "El carrito está vacío.";
    } else {
        mensaje.innerHTML = "¡Compra realizada con éxito!";
        vaciarCarrito();
    }
}

function calcularCantidadTotal() {
    return carritoCompras.reduce(function (total, producto) {
        return total + producto.cantidad;
    }, 0);
}

function formatearPrecio(precio) {
    return new Intl.NumberFormat("es-CL").format(precio);
}
